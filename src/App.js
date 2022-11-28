import MoneyManager from './components/MoneyManager'
import './App.scss';

import { ConfigProvider, theme} from 'antd';

function App() {
  return (
	<ConfigProvider
	
		theme={{
			// token: {
			// 	colorPrimary: '#9FA8DA',
			// 	colorBgBase: '#212121',
			// 	fontFamily: 'Roboto'
			// },
			// algorithm: theme.darkAlgorithm,
		}}
	>
    	<MoneyManager />
	</ConfigProvider>
  );
}

export default App;
