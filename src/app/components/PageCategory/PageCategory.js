import Link from 'next/link'
import './PageCategory.sass'
import Image from 'next/image'
// Images
//PageCategory
import PageCategory1 from '../../assets/img/categories/1.jpg'
import PageCategory2 from '../../assets/img/categories/2.jpg'
import PageCategory3 from '../../assets/img/categories/3.jpg'
import PageCategory4 from '../../assets/img/categories/4.jpg'
import PageCategory5 from '../../assets/img/categories/5.jpg'
import PageCategory6 from '../../assets/img/categories/6.jpg'

export default function PageCategoryBlock() {
    return(
        <div className="PageCategoryBlock">
            <div className="PageCategoryItems">
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory1} className="PageCategoryItemImage" alt='Пуховики'></Image><div className="PageCategoryItemName">Пуховики</div></Link>
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory2} className="PageCategoryItemImage" alt='Бомберы'></Image><div className="PageCategoryItemName">Бомберы</div></Link>
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory3} className="PageCategoryItemImage" alt='Легкие куртки'></Image><div className="PageCategoryItemName">Легкие куртки</div></Link>
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory4} className="PageCategoryItemImage" alt='Жилеты'></Image><div className="PageCategoryItemName">Жилеты</div></Link>
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory5} className="PageCategoryItemImage" alt='Пальто'></Image><div className="PageCategoryItemName">Пальто</div></Link>
              <Link href='/' className="PageCategoryItem"><Image src={PageCategory6} className="PageCategoryItemImage" alt='Дождевики'></Image><div className="PageCategoryItemName">Дождевики</div></Link>
            </div>
          </div>
    )
}