import ApplicationLogo from "@/Components/ApplicationLogo";
import SocialMediaLink from "@/Components/SocialMediaLink";
export default function Footer() {
    return (
        <footer className="p-8 bg-neutral text-neutral-content">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                <div>
                    <ApplicationLogo className="block h-10 w-auto fill-current" />
                    <p>Orbit Trust Corp.<br />Percetakan & Digital Printing</p>
                </div>
                <SocialMediaLink />
            </div>
        </footer>
    )
}