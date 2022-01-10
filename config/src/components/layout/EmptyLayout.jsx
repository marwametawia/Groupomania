import {Layout} from './Layout';

export const EmptyLayout = ({children}) => {
    return <Layout>
        <div>
            {children}
        </div>
    </Layout>
}
