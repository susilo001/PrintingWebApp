import Input from "@/Components/Input";
import { router, useForm, usePage, Link } from "@inertiajs/react";
import Button from "@/Components/Button";
import Modal from "@/Components/Modal";
import { useState } from "react";
import TextArea from "@/Components/TextArea";
import { CheckIcon } from "@heroicons/react/24/outline";
import UpdateShippingAddress from "./UpdateShippingAddress";

export default function CreateShippingAddress({ className }) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editAddress, setEditAddress] = useState({});
    const cities = usePage().props.cities;
    const addresses = usePage().props.addresses;

    const { data, setData, post, errors, processing } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        city_id: '',
        city_name: '',
        province_id: '',
        province: '',
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

    const selectedCity = (e) => {
        const city = JSON.parse(e.target.value);
        setData({ ...data, ...city });
    }

    const selectedAddress = (id) => {
        router.patch(route('address.update', id), { id: id, is_active: true });
    }

    const openEditModal = (address) => {
        setOpenEdit(true);
        setEditAddress(address);
    }

    const closeEditModal = () => {
        setOpenEdit(false);
    }

    return (
        <section className={className}>
            <header className="flex w-full justify-between">
                <div>
                    <h2 className="text-lg font-medium">Shipping Information</h2>
                    <p className="mt-1 text-sm">Update your account shipping information.</p>
                </div>
                <Button className="btn-success btn-md text-white" disabled={processing} onClick={openModal}>
                    New Address
                </Button>
            </header>

            {addresses.map((address) => (
                <div key={address.id} className={`mt-6 border p-8 shadow-md rounded-md grid grid-cols-2 ${address.is_active === true ? 'border-success' : ''}`}>
                    <div className="space-y-2 flex flex-col">
                        <h3 className="text-lg font-medium">{address.first_name} {address.last_name}</h3>
                        <span className="text-sm">{address.email}</span>
                        <span className="text-sm">{address.phone}</span>
                        <p className="text-sm">{address.address}, {address.city_name}, {address.province}, {address.postal_code}</p>
                        <div className="space-x-4">
                            <button className="text-accent hover:text-base-300" onClick={() => openEditModal(address)}>Edit</button>
                            <Link className="text-error hover:text-base-300" type="button" as="button" method="delete" href={route('address.destroy', address.id)}>Delete</Link>
                        </div>
                    </div>
                    <div className="space-y-4 flex justify-end items-center">
                        {address.is_active ? (
                            <CheckIcon className="w-10 h-10 text-green-500" />
                        ) : (
                            <Button className="btn-primary btn-sm normal-case" onClick={() => selectedAddress(address.id)}>Pilih</Button>
                        )}
                    </div>
                </div>
            ))}

            <Modal title="Add New Address" show={open} onClose={closeModal}>
                <form onSubmit={submit} className="p-8">
                    <h3 className="text-lg font-medium">Shipping Information</h3>
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
                    <div className="grid grid-cols-3 gap-2">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">City</span>
                            </label>
                            <select onChange={selectedCity} className="select select-bordered">
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.city_id} value={JSON.stringify(city)}>{city.city_name}</option>
                                ))}
                            </select>
                        </div>

                        <Input
                            id="province"
                            label="Province"
                            value={data.province}
                            handleChange={(e) => setData("province", e.target.value)}
                            required
                            isFocused
                            disabled
                            autoComplete="province"
                            className="input-bordered"
                            errors={errors.province}
                        />
                        <Input
                            id="postal_code"
                            label="Postal Code"
                            value={data.postal_code}
                            handleChange={(e) => setData("postal_code", e.target.value)}
                            required
                            isFocused
                            disabled
                            autoComplete="postal_code"
                            className="input-bordered"
                            errors={errors.postal_code}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="btn-sm btn-success" disabled={processing} type='submit'>Save</Button>
                        <Button className="btn-error btn-sm" disabled={processing} onClick={closeModal}>Cancel</Button>
                    </div>
                </form>
            </Modal>

            <Modal title="Edit Address" show={openEdit} onClose={closeEditModal}>
                <UpdateShippingAddress address={editAddress} cities={cities} />
            </Modal>
        </section>
    );
}
