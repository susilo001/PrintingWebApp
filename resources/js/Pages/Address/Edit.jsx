import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import TextArea from "@/Components/TextArea";

export default function Edit({ address }) {
    const { data, setData, patch, errors, processing } = useForm({
        first_name: address.first_name,
        last_name: address.last_name,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        postal_code: address.postal_code,
    });

    function handleSubmit(e) {
        e.preventDefault();
        patch(route("address.update", address.id));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Edit Address</h2>}
        >
            <Head title="Edit Address" />

            <div className="border p-4 shadow sm:rounded-lg sm:p-8">
                <div className="max-w-7xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                className="input-bordered"
                                label="First Name"
                                name="first_name"
                                type="text"
                                value={data.first_name}
                                handleChange={(e) => setData("first_name", e.target.value)}
                                errors={errors.first_name}
                            />
                            <Input
                                className="input-bordered"
                                label="Last Name"
                                name="last_name"
                                type="text"
                                value={data.last_name}
                                handleChange={(e) => setData("last_name", e.target.value)}
                                errors={errors.last_name}
                            />
                        </div>
                        <Input
                            className="input-bordered"
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            handleChange={(e) => setData("email", e.target.value)}
                            errors={errors.email}
                        />
                        <Input
                            className="input-bordered"
                            label="Phone"
                            name="phone"
                            type="text"
                            value={data.phone}
                            handleChange={(e) => setData("phone", e.target.value)}
                            errors={errors.phone}
                        />
                        <TextArea label="Address" name="address" value={data.address} handleChange={(e) => setData("address", e.target.value)} className="input-bordered" errors={errors.address} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                className="input-bordered"
                                label="City"
                                name="city"
                                type="text"
                                value={data.city}
                                handleChange={(e) => setData("city", e.target.value)}
                                errors={errors.city}
                            />
                            <Input
                                className="input-bordered"
                                label="Postal Code"
                                name="postal_code"
                                type="text"
                                value={data.postal_code}
                                handleChange={(e) => setData("postal_code", e.target.value)}
                                errors={errors.postal_code}
                            />
                        </div>
                        <Button className="btn-primary text-white" type='submit' disable={processing}>
                            Update Address
                        </Button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
