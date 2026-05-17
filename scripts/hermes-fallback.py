#!/usr/bin/env python3
from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path


def main() -> int:
    hermes_bin = os.environ.get("HERMES_BIN", str(Path.home() / ".hermes" / "hermes-agent" / "venv" / "bin" / "hermes"))
    primary = os.environ.get("HERMES_PRIMARY_MODEL", "gemma4:26b")
    secondary = os.environ.get("HERMES_SECONDARY_MODEL", "minimax-m2:cloud")
    tertiary = os.environ.get("HERMES_TERTIARY_MODEL", "deepseek-v3.1:671b-cloud")
    per_model_timeout = int(os.environ.get("HERMES_MODEL_TIMEOUT_SECONDS", "25"))
    models = [primary, secondary, tertiary]
    failure_patterns = re.compile(r"invalid tool call|Session not found|No Anthropic credentials found|Adapter failed|Error:", re.I)
    base_args = sys.argv[1:]

    for index, model in enumerate(models, start=1):
        print(f"[hermes-fallback] trying model={model}", file=sys.stderr, flush=True)
        proc = subprocess.Popen(
            [hermes_bin, *base_args, "--model", model],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        try:
            output, _ = proc.communicate(timeout=per_model_timeout)
            timed_out = False
        except subprocess.TimeoutExpired:
            proc.kill()
            output, _ = proc.communicate()
            timed_out = True

        if output:
            sys.stdout.write(output)
            sys.stdout.flush()

        failed = timed_out or proc.returncode != 0 or bool(failure_patterns.search(output or ""))
        if not failed:
            return 0

        if timed_out:
            print(f"[hermes-fallback] model={model} timed out after {per_model_timeout}s", file=sys.stderr, flush=True)
        elif proc.returncode != 0:
            print(f"[hermes-fallback] model={model} exited with code {proc.returncode}", file=sys.stderr, flush=True)
        else:
            print(f"[hermes-fallback] model={model} produced a failure signature", file=sys.stderr, flush=True)

        if index < len(models):
            print(f"[hermes-fallback] falling back to {models[index]}", file=sys.stderr, flush=True)

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
