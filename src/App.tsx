import React, { useEffect } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import Header from './components/header/header';
import SalesView from './components/salesView/salesView';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchProductData, setData } from './store/appSlice';
import ProductView from './components/productView/productView';
import ProductDetails from './components/ProductDetails/productDetails';

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
				<div className={styles.productDetailSection}>
					<SalesView/>
					<ProductDetails/>
				</div>
			</div>
		</div>
	);
};

export default App;
