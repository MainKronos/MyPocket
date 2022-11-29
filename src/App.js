import MoneyManager from './components/MoneyManager'
import './App.scss';

import { ConfigProvider, theme, Layout} from 'antd';

function App() {
  return (
	<ConfigProvider
	
		theme={{
			token: {
				// colorPrimary: '#9FA8DA',
				// colorBgBase: '#212121',
				// fontFamily: 'Roboto'
			},
			algorithm: theme.darkAlgorithm,
		}}
	>
		<Layout id="container">
    		<MoneyManager />
		</Layout>
	</ConfigProvider>
  );
}

export default App;
