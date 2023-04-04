import styles from './Steps.module.scss'

interface StepsProps {
    steps: Array<string>
    current: number
}

export const Steps = (props: StepsProps): JSX.Element => (
    <div className={styles.steps}>
        {props.steps.map(
            (step: string, index: number): JSX.Element => (
                <div className={`${styles.step} ${props.current === index ? styles.current : ''}`} key={step}>
                    <span className={styles.number}>{index + 1}</span>
                    <span className={styles.name}>{step}</span>
                </div>
            )
        )}
    </div>
)
