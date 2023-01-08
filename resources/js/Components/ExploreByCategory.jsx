import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import {
    MagnifyingGlassIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function ExploreByCategory() {
    return (
        <div className="my-8">
            <div className="flex justify-center mb-8">
                <h2 className="text-2xl font-bold">Explore by Category</h2>
            </div>
            <div className="grid grid-cols-3 gap-x-4">
                <div className="flex flex-col max-h-screen place-content-between space-y-2">
                    <div className="w-full">
                        <Input
                            type={"text"}
                            placeholder={"Search"}
                            className={"input-bordered w-full"}
                        />
                    </div>
                    <div className="basis-1/2">
                        <div className="flex flex-col space-y-4 border-r-2 mr-10 pl-4">
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                            <span>Category</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button className={"btn-primary"}>
                            Explore
                            <ArrowRightIcon className={"w-4 h-4"} />
                        </Button>
                    </div>
                </div>
                <div className="col-span-2 max-h-screen overflow-y-auto snap-y scroll-pt-12 overscroll-x-none">
                    <div className="grid grid-cols-2 gap-8 snap-start pr-8">
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                        <Card className={"shadow-xl image-full w-96"}>
                            <Card.Image
                                src={"https://picsum.photos/400/300"}
                                alt={"alt"}
                            />
                            <Card.Body
                                className={"justify-center items-center"}
                            >
                                <Card.Title className={"text-2xl font-bold"}>
                                    Card Title
                                </Card.Title>
                                <Card.Actions>
                                    <Button className={"btn-primary"}>
                                        Explore
                                    </Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
