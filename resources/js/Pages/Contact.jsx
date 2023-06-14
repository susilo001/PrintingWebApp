import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, useForm } from "@inertiajs/react"
import Input from "@/Components/Input"
import TextArea from "@/Components/TextArea"
import Button from "@/Components/Button"
export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("contact.store"), {
            onSuccess: () => reset(),
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <h1 className="font-semibold text-xl leading-tight">
                    Contact Us
                </h1>
            }>
            <Head title="Contact Us" />

            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type='text'
                            label="First Name"
                            name="first_name"
                            className='input-bordered'
                            value={data.first_name}
                            errors={errors.first_name}
                            handleChange={(e) => setData('first_name', e.target.value)} />
                        <Input
                            type='text'
                            label="Last Name"
                            name="last_name"
                            className='input-bordered'
                            value={data.last_name}
                            errors={errors.last_name}
                            handleChange={(e) => setData('last_name', e.target.value)} />
                    </div>
                    <Input
                        type='email'
                        label="Email"
                        name="email"
                        className='input-bordered'
                        value={data.email}
                        errors={errors.email}
                        handleChange={(e) => setData('email', e.target.value)} />
                    <TextArea
                        type='text'
                        label="Message"
                        name="message"
                        className='input-bordered w-full'
                        value={data.message}
                        errors={errors.message}
                        handleChange={(e) => setData('message', e.target.value)} />
                    <Button
                        type='submit'
                        className='btn-primary text-white btn-block'
                        disable={processing}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}