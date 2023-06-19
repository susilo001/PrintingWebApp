import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import TextArea from "@/Components/TextArea";

export default function UpdateShippingAddress({ address, cities }) {
    const { data, setData, patch, errors, processing } = useForm({
        first_name: address.first_name,
        last_name: address.last_name,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city_name,
        province: address.province,
        postal_code: address.postal_code,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("address.update", address.id));
    }

    const selectedCity = (e) => {
        const city = JSON.parse(e.target.value);
        setData({ ...data, ...city });
    }

    return (
        <form onSubmit={handleSubmit} className="p-8">
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
            <div className="grid grid-cols-3 gap-4">
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
            <Button className="btn-primary btn-sm normal-case text-white" type='submit' disabled={processing}>
                Save
            </Button>
        </form>
    )
}