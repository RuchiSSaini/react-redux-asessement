import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from './productDetails.module.css';
import { SalesData } from '../../dataType/dataType';

type SortableKeys = keyof SalesData;
const ProductDetails: React.FC = () => {
	const salesData = useAppSelector((state) => state.product.sales);

	const [sortConfig, setSortConfig] = useState<{
		key: SortableKeys;
		direction: 'ascending' | 'descending';
	} | null>({ key: 'weekEnding', direction: 'ascending' });

	const sortedSalesData = React.useMemo(() => {
		let sortableItems = [...salesData];

		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [salesData, sortConfig]);

	const requestSort = (key: keyof SalesData) => {
		let direction: 'ascending' | 'descending' = 'ascending';

		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	return (
		<div className={styles.productDetails}>
			<table>
				<thead>
					<tr>
						{Object.keys(TABLE_HEADERS).map((key) => (
							<th key={key} onClick={() => requestSort(key as keyof SalesData)}>
								<span>
									{sortConfig?.key === key
										? sortConfig.direction === 'ascending'
											? '↓\u00A0'
											: '↑\u00A0'
										: '⇵\u00A0'}
								</span>
								{TABLE_HEADERS[key as keyof typeof TABLE_HEADERS]}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{sortedSalesData.map((sale, index) => (
						<tr key={index}>
							<td>{sale.weekEnding}</td>
							<td>{`$${sale.retailSales.toLocaleString()}`}</td>
							<td>{`$${sale.wholesaleSales.toLocaleString()}`}</td>
							<td>{`${sale.unitsSold.toLocaleString()}`}</td>
							<td>{`$${sale.retailerMargin.toLocaleString()}`}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const TABLE_HEADERS = {
	weekEnding: 'Week Ending',
	retailSales: 'Retail Sales',
	wholesaleSales: 'Wholesale Sales',
	unitsSold: 'Units Sold',
	retailerMargin: 'Retailer Margin',
};

export default ProductDetails;