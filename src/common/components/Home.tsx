const Home = () => {
    return (
        <div className="h-screen w-11/12 max-w-7xl mx-auto grid place-content-center gap-4">
            <h1 className="font-bold text-4xl">Welcome to the Todo App :)</h1>

            <p className="text-lg text-zinc-700 dark:text-zinc-200">
                Manage your tasks efficiently with this intuitive Todo app! Here's what you can do:
            </p>

            <div className="text-lg flex flex-col gap-2">
                <h2 className="font-semibold text-2xl text-sky-600">For Everyone:</h2>
                <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-200">
                    <li>Create and manage your own Todo tasks.</li>
                    <li>Move tasks between different stages: Pending, In Progress, and Completed.</li>
                    <li>Assign users to your own tasks for better collaboration.</li>
                    <li>Delete tasks that are no longer needed.</li>
                </ul>

                <h2 className="font-semibold text-2xl text-sky-600">For Admins:</h2>
                <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-200">
                    <li>Admins have special control to manage all tasks across users.</li>
                    <li>Edit, delete, and reassign tasks from all users.</li>
                    <li>Admins are easily identifiable with a yellow crown badge next to their name in the sidebar.</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
