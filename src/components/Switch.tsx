import styles from './Switch.module.css';

/** Interrupteur accessible (role="switch"). */
export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className={styles.row} onClick={() => onChange(!checked)}>
      <span className={styles.label}>{label}</span>
      <span className={styles.track} data-on={checked}>
        <span className={styles.knob} />
      </span>
    </button>
  );
}
