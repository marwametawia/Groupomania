import {Layout} from './Layout';
import Header from './Header/Header';

export const MainLayout = ({children}) => {
    return <Layout>
        <div>
            <Header />
            {children}
        </div>
    </Layout>
}
