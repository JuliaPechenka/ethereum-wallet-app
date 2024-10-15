import preactLogo from '../../assets/tatum.jpeg'
import BalanceForm from '../../components/BalanceForm';
import styles from './style.module.css';

export function Home() {
	return (
		<div class={styles.home}>
			<a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Tatum Hello</h1>
			<BalanceForm />
		</div>
	);
}