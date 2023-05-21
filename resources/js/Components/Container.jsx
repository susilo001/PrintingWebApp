const Container = ({ children }) => {
    return (
        <div className="container mx-auto my-12 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {children}
        </div>
    );
    }

export default Container;