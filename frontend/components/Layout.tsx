import Navbar from './Navbar';

type Props = {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <>
            <div>
                <Navbar />
                <main className="max-w-prose mx-auto pt-4 pb-12">{children}</main>
            </div>
        </>
    )
}

export default Layout;