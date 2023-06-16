import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navbar, Alignment, Button, EditableText, MenuItem } from '@blueprintjs/core';
import { Popover2 } from "@blueprintjs/popover2";
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import Alert from '@/lib/sweetalert';
import { Select2 } from "@blueprintjs/select";

const CustomToolbar = observer(({ store, auth, role }) => {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/category').then((response) => {
            setCategories(response.data.categories);
        })
    }, []);

    const filterCategory = (query, category) => {
        return category.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    const renderCategory = (category, { handleClick, modifiers, handleFocus }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={category.id}
                label={category.name}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={`${category.id}. ${category.name}`}
            />
        );
    };

    const handleSaveTemplate = async () => {
        await store.toBlob().then((blob) => {
            router.post('/design', {
                data: JSON.stringify(store.toJSON()),
                image: blob,
            }, {
                onSuccess: (page) => {
                    Alert('success', 'Success', page.props.flash.message);
                },
            }
            );
        })
    };

    const handleSaveAsImage = async () => {
        await store.saveAsImage({ includeBleed: true });
    };

    const handleSaveAsPDF = async () => {
        await store.saveAsPDF({ includeBleed: true });
    };

    const handleLogout = () => {
        router.post('/logout');
    };
    return (
        <Navbar className='flex justify-between'>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>
                    <Link href={route("home")} as="a">
                        <img srcSet="../asset/logo/logo_scale,w_200.png 200w,../asset/logo/logo_scale,w_478.png 478w,../asset/logo/logo_scale,w_674.png 674w,../asset/logo/logo_scale,w_783.png 783w" sizes="(max-width: 674px) 100vw, 674px" alt='Orbit Logo' className='w-20' />
                    </Link>
                </Navbar.Heading>
            </Navbar.Group>
            <Navbar.Group align={Alignment.CENTER}>
                <EditableText
                    type='input'
                    placeholder="Page Name"
                    defaultValue="Untitled Page"
                    value={store.pages[0].custom?.name}
                    onChange={(val) => {
                        store.pages[0].set({
                            custom: {
                                ...store.pages[0].custom,
                                name: val,
                            },
                        });
                    }}
                />
                <Navbar.Divider />
                <Select2
                    items={categories}
                    itemRenderer={renderCategory}
                    itemPredicate={filterCategory}
                    onItemSelect={
                        (item) => {
                            store.pages[0].set({
                                custom: {
                                    ...store.pages[0].custom,
                                    category: {
                                        id: item.id,
                                        name: item.name,
                                    },
                                },
                            });
                        }
                    }
                >
                    <Button text={store.pages[0].custom?.category ? store.pages[0].custom.category.name : 'Category'} rightIcon='double-caret-vertical' />
                </Select2>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Popover2
                    position='bottom'
                    content={
                        <div className='flex flex-col'>
                            <Button icon='import' onClick={handleSaveAsImage}>Export As Image</Button>
                            <Button icon='import' onClick={handleSaveAsPDF}>Export As PDF</Button>
                        </div>
                    }>
                    <Button icon='import' />
                </Popover2>
                {role == 'administrator' && <Button icon='floppy-disk' onClick={handleSaveTemplate} />}
                <Navbar.Divider />
                <Popover2
                    position='bottom'
                    content={
                        <div className='flex flex-col'>
                            <Button icon='person'>{auth.user.name}</Button>
                            <Button icon='log-out' onClick={handleLogout}>Logout</Button>
                        </div>
                    }>
                    <Button icon='person' />
                </Popover2>
            </Navbar.Group>
        </Navbar>
    );
});

export default CustomToolbar;