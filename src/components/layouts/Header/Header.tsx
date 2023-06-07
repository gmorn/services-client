import Logo from '@/components/blocks/Logo/Logo'
import styles from './Header.module.scss'
import SearchForm from '@/components/views/Header/SearchForm/SearchForm'
import UserNav from '@/components/views/Header/userNav/UserNav'
import Link from 'next/link'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className="wrapper">
        <header className={styles.header}>
            <div className={styles.searchForm}>
                <SearchForm/>
            </div>
            <div className={styles.logo}>
              <Link href='/'>
                <Logo/>
              </Link>
            </div>
            <div className={styles.userNav}>
                <UserNav/>
            </div>
        </header>
    </div>
  )
}