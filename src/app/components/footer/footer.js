import Link from "next/link"
import './footer.sass'

export default function Footer(){
    return(
        <div className="Footer">
            <div className="container">
                <div className="FooterInfoBlock">
                    <div className="FooterContactWrapper">
                        <div className="FooterContacts">
                            <div className="FooterLogo">3legant</div>
                            <div className="FooterContactBlock">
                                <div className="FooterAddressItem">43111 Hai Trieu street,</div>
                                <div className="FooterAddressItem">District 1, HCMC</div>
                                <div className="FooterAddressItem">Vietnam</div>
                                <div className="FooterAddressItem">84-756-3237</div>
                            </div>
                            <div className="FooterSmm">
                                <div className="FooterSmmItem"><i className="fa-brands fa-vk"></i></div>
                                <div className="FooterSmmItem"><i className="fa-brands fa-square-facebook"></i></div>
                                <div className="FooterSmmItem"><i className="fa-brands fa-instagram"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="FooterPagesMap">
                        <div className="FooterPagesHeader">Страницы:</div>
                        <Link className="PageLink" href="/">Главная</Link>
                        <Link className="PageLink" href="/category">Категории</Link>
                        <div style={{color: '#c0c0c0'}} className="PageLink" href="/contacts">Контакты</div>
                        <div style={{color: '#c0c0c0'}} className="PageLink" href="/support">Поддержка</div>
                        <div style={{color: '#c0c0c0'}} className="PageLink" href="/refund">Возвраты</div>
                    </div>
                </div>
                <div className="FooterInfoCopyright">
                    <div className="divider"></div>
                    <div className="CopyrightInfo">Copyright © 2023 3legant. All rights reserved</div>
                </div>
            </div>
        </div>
    )
}