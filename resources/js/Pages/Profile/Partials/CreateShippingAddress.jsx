import Input from "@/Components/Input";
import { router, useForm, usePage, Link } from "@inertiajs/react";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import { useState } from "react";
import TextArea from "@/Components/TextArea";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function CreateShippingAddress({ className }) {
    const [open, setOpen] = useState(false);
    const addresses = usePage().props.addresses;

    const { data, setData, post, errors, processing } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("address.store"), {
            onSuccess: () => closeModal(),
        });
    };

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const selectedAddress = (id) => {
        router.patch(route('address.update', id), { id: id, is_active: true });
    }


    return (
        <section className={className}>
            <header className="flex w-full justify-between">
                <div>
                    <h2 className="text-lg font-medium">Shipping Information</h2>
                    <p className="mt-1 text-sm">Update your account shipping information.</p>
                </div>
                <Button className="btn-primary text-white" disabled={processing} onClick={openModal}>
                    Add New Address
                </Button>
            </header>

            {addresses.map((address) => (
                <div key={address.id} className={`mt-6 border p-8 rounded-md grid grid-cols-2 ${address.is_active === true ? 'bg-base-200' : ''}`}>
                    <div className="space-y-4 flex flex-col">
                        <h3 className="text-lg font-medium">{address.first_name} {address.last_name}</h3>
                        <span className="text-sm">{address.email}</span>
                        <span className="text-sm">{address.phone}</span>
                        <p className="text-sm">{address.address} {address.city} {address.postal_code}</p>
                        <div className="space-x-4">
                            <Link className="text-primary" href={route('address.update', address.id)}>Edit</Link>
                            <Link className="text-error" type="button" as="button" method="delete" href={route('address.destroy', address.id)}>Delete</Link>
                        </div>
                    </div>
                    <div className="space-y-4 flex justify-end items-center">
                        {address.is_active ? (
                            <CheckIcon className="w-10 h-10 text-green-500" />
                        ) : (
                            <Button className="btn-accent btn-sm normal-case" onClick={() => selectedAddress(address.id)}>Pilih</Button>
                        )}
                    </div>
                </div>
            ))}

            <Modal title="Add New Address" show={open} onClose={closeModal}>
                <form onSubmit={submit} className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            id="first_name"
                            label="First Name"
                            value={data.first_name}
                            handleChange={(e) => setData("first_name", e.target.value)}
                            required
                            isFocused
                            autoComplete="first_name"
                            className="input-bordered"
                            errors={errors.first_name}
                        />
                        <Input
                            id="last_name"
                            label="Last Name"
                            value={data.last_name}
                            handleChange={(e) => setData("last_name", e.target.value)}
                            required
                            isFocused
                            autoComplete="last_name"
                            className="input-bordered"
                            errors={errors.last_name}
                        />
                    </div>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        value={data.email}
                        handleChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                        className="input-bordered"
                        errors={errors.email}
                    />
                    <Input
                        label="Phone"
                        id="phone"
                        type="text"
                        value={data.phone}
                        handleChange={(e) => setData("phone", e.target.value)}
                        required
                        autoComplete="phone"
                        className="input-bordered"
                        errors={errors.phone}
                    />
                    <TextArea label="Address" id="address" value={data.address} handleChange={(e) => setData("address", e.target.value)} required className="input-bordered" errors={errors.address} />
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            id="city"
                            label="City"
                            value={data.city}
                            handleChange={(e) => setData("city", e.target.value)}
                            required
                            isFocused
                            autoComplete="city"
                            className="input-bordered"
                            errors={errors.city}
                        />
                        <Input
                            id="postal_code"
                            label="Postal Code"
                            value={data.postal_code}
                            handleChange={(e) => setData("postal_code", e.target.value)}
                            required
                            isFocused
                            autoComplete="postal_code"
                            className="input-bordered"
                            errors={errors.postal_code}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="btn-sm btn-primary" disabled={processing} type='submit'>Save</Button>
                        <Button className="btn-error btn-sm" disabled={processing} onClick={closeModal}>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
