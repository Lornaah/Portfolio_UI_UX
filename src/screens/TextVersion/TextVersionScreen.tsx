import { Link } from 'react-router-dom';
import { achievements, rarityLabels } from '../../data/achievements';
import { characterProfile, characterStats, equipment } from '../../data/character';
import { classes } from '../../data/classes';
import { levelLine, mailto, profile } from '../../data/profile';
import { talentTrees } from '../../data/talents';
import { zones } from '../../data/zones';
import styles from './TextVersion.module.css';

/** Version texte : tout le portfolio sur une page simple, sans jeu ni animation (mêmes données). */
export function TextVersionScreen() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p><Link to="/jeu">← Revenir au portfolio interactif</Link></p>
        <h1>{profile.fullName}</h1>
        <p className={styles.lead}>{profile.classesLine}</p>
        <p>{levelLine} · {profile.availability.status} : {profile.availability.detail} {profile.availability.since}</p>
        <p>
          <a href={mailto}>Prendre contact</a> · <a href={profile.cvHref} download>Télécharger le CV (PDF)</a>
        </p>

        <h2>Profil</h2>
        <dl className={styles.dl}>
          {[...characterProfile, ...characterStats].map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
          ))}
        </dl>

        <h2>Métiers</h2>
        {classes.map((c) => (
          <section key={c.id}>
            <h3>{c.name}</h3>
            <p><em>« {c.line} »</em> {c.pitch}</p>
          </section>
        ))}

        <h2>Faits d’armes</h2>
        {achievements.map((a) => (
          <section key={a.id}>
            <h3>{a.title}</h3>
            <p>{rarityLabels[a.rarity]} · {a.meta}. {a.sub}</p>
            <ul>{a.criteria.map((c) => <li key={c}>{c}</li>)}</ul>
          </section>
        ))}

        <h2>Compétences</h2>
        {talentTrees.map((t) => (
          <section key={t.id}>
            <h3>{t.name}</h3>
            <ul>
              {t.branches.map((b) => (
                <li key={b.id}>
                  <strong>{b.label}</strong> :{' '}
                  {b.talents.map((x) => `${x.label}${x.status === 'learning' ? ' (en cours)' : ''}`).join(', ')}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <h2>Outils</h2>
        <ul>{equipment.map((e) => <li key={e.id}>{e.tool} ({rarityLabels[e.rarity]})</li>)}</ul>

        <h2>Où je travaille</h2>
        <ul>{zones.map((z) => <li key={z.id}><strong>{z.name}</strong> : {z.desc}</li>)}</ul>
      </main>
    </div>
  );
}
