import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DiagnosisSection from "@/components/DiagnosisSection";
import ProtocolSection from "@/components/ProtocolSection";
import PrincipleSection from "@/components/PrincipleSection";
import WhoSection from "@/components/WhoSection";
import MarkSection from "@/components/MarkSection";
import GlobalSection from "@/components/GlobalSection";
import RequestSection from "@/components/RequestSection";
import PageBreakMarker from "@/components/PageBreakMarker";
import ExaminationSection from "@/components/ExaminationSection";
import MethodologySection from "@/components/MethodologySection";
import IndustriesSection from "@/components/IndustriesSection";
import FindingsSection from "@/components/FindingsSection";
import OversightSection from "@/components/OversightSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navigation />
            <main>
                <HeroSection />
                <PageBreakMarker name="The Diagnosis" section="Section 01" />
                <DiagnosisSection />
                <PageBreakMarker name="Protocol" section="Section 02" />
                <ProtocolSection />
                <PageBreakMarker name="Principle" section="Section 03" />
                <PrincipleSection />
                <PageBreakMarker name="Clientele" section="Section 04" />
                <WhoSection />
                <PageBreakMarker name="The Mark" section="Section 05" />
                <MarkSection />
                <PageBreakMarker name="Global Coverage" section="Section 06" />
                <GlobalSection />
                <PageBreakMarker name="Submission" section="Section 07" />
                <RequestSection />
                <PageBreakMarker name="The Examination" section="Section 08" />
                <ExaminationSection />
                <PageBreakMarker name="Methodology" section="Section 09" />
                <MethodologySection />
                <PageBreakMarker name="Industries" section="Section 10" />
                <IndustriesSection />
                <PageBreakMarker name="Findings" section="Section 11" />
                <FindingsSection />
                <PageBreakMarker name="Ongoing Oversight" section="Section 12" />
                <OversightSection />
            </main>
            <Footer />
        </>
    );
}
