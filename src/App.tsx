import React, { useEffect } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Header from './header/header';
import FetchJSON from './components/fetchJSON';
import SalesView from './components/salesview';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProductData } from './store/appSlice';
import ProductView from './components/productView';

const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);

	if (loading) {	
		return <div className={styles.loading}>Loading...</div>;
	}

	return (
		<div className={"App"}>
			<Header />
			<div className={styles.mainContainer}>
			<div className={styles.productOverviewSection}>
					<ProductView />
				</div>
				<div className={"productDetailSection"}>
					
				</div>
			</div>
		</div>
	);
};

export default App;
