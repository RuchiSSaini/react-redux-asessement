import { Chart as ChartJS, ChartOptions, registerables } from 'chart.js';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../store/hooks';
import { SalesData } from '../dataType/dataType';

const verticalLinePlugin = {
	id: 'verticalLinePlugin',
	afterDraw: (chart: any) => {
		if (chart.tooltip._active && chart.tooltip._active.length) {
			const ctx = chart.ctx;
			const x = chart.tooltip._active[0].element.x;
			const topY = chart.scales.y.top;
			const bottomY = chart.scales.y.bottom;

			// draw line
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x, topY);
			ctx.lineTo(x, bottomY);
			ctx.lineWidth = 1;
			ctx.setLineDash([5, 5]);
			ctx.strokeStyle = '#007bff';
			ctx.stroke();
			ctx.restore();
		}
	},
};

ChartJS.register(...registerables);
ChartJS.register(verticalLinePlugin);

const SalesView: React.FC = () => {
	const salesData = useAppSelector((state) => state.slice.sales);

	const { labels, retailSales, wholesaleSales, maxSales, minSales } = useMemo(
		() => getSalesDataByDay(salesData),
		[salesData]
	);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'Retail Sales',
				data: retailSales,
				borderColor: 'rgba(0, 123, 255, 1)',
				backgroundColor: 'rgba(0, 123, 255, 0.5)',
				tension: 0.4,
			},
			{
				label: 'Wholesale Sales',
				data: wholesaleSales,
				borderColor: 'rgba(108, 117, 125, 1)',
				backgroundColor: 'rgba(108, 117, 125, 0.5)',
				tension: 0.4,
			},
		],
	};

	const options: ChartOptions<'line'> = {
		elements: {
			point: {
				radius: 3,
			},
		},
		animation: {
			duration: 1000,
			easing: 'easeOutQuart',
		},
		scales: {
			x: {
				offset: true,
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				type: 'time',
				time: {
					unit: 'month',
					displayFormats: {
						month: 'MMM',
					},
					tooltipFormat: 'MMM d, yyyy',
				},
				title: {
					display: false,
				},
			},
			y: {
				max: maxSales + (maxSales - minSales) / 2,
				min: minSales - (maxSales - minSales) / 2,
				offset: true,
				display: false,
				grid: {
					display: false,
				},
			},
		},
		interaction: {
			intersect: false,
			mode: 'index',
		},
		maintainAspectRatio: false,
	};

	return (
		<div className={"sales"}>
			<Line options={options} data={chartData} />
		</div>
	);
};

const getSalesDataByDay = (
	salesData: SalesData[]
): {
	labels: string[];
	retailSales: number[];
	wholesaleSales: number[];
	maxSales: number;
	minSales: number;
} => {
	const labels = salesData.map((data) => data.weekEnding);
	const retailSales = salesData.map((data) => data.retailSales);
	const wholesaleSales = salesData.map((data) => data.wholesaleSales);
	const maxSales: number = Math.max(...retailSales, ...wholesaleSales);
	const minSales: number = Math.min(...retailSales, ...wholesaleSales);

	return { labels, retailSales, wholesaleSales, maxSales, minSales };
};

export default SalesView;