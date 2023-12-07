'use client'
import { Input } from "reactstrap";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function CategoryOptions(props){
    const router = useRouter();
    const [activeCategoryItem, setactiveCategoryItem] = useState('All');

    const changeactiveCategoryItem = (item) => {
        setactiveCategoryItem(item);
        const path = `/category/${item.toLowerCase()}/`;
        router.push(path);
      };

    let[filterMeaningItem, setfilterMeaning] = useState('')
    let[specMeaningItem, setspecMeaning] = useState('')
    return(
        <div className={activeCategoryItem === 'filter-btn' ? "CategoryOptions active" : "CategoryOptions"}>
            <div className="OptionsWrapper OptionsWrapperDesktop">
                <div className="OptionsBlock">
                    <div className="OptionsBlockHeader">Категории</div>
                    <ul className="UlOptions Categories">
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem1}`} 
                            onClick={() => 
                                changeactiveCategoryItem('') + setfilterMeaning('all')
                            }>Все</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem2}`} 
                            onClick={() => 
                                changeactiveCategoryItem('Puffers') + setfilterMeaning('puffers')
                            }>Пуховики</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem3}`} 
                            onClick={() => 
                                changeactiveCategoryItem('Bombers') + setfilterMeaning('bombers')
                            }>Бомберы</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem4}`} 
                            onClick={() => 
                                changeactiveCategoryItem('LightweightJackets') + setfilterMeaning('jacket')
                            }>Легкие куртки</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem5}`} 
                            onClick={() => 
                                changeactiveCategoryItem('Gilets') + setfilterMeaning('gilets')
                            }>Жилеты</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem6}`} 
                            onClick={() => 
                                changeactiveCategoryItem('Coats') + setfilterMeaning('coats')
                            }>Пальто</li>
                        <li 
                            className={`UlOptionItem CategoryItem ${props.CategoryItem7}`} 
                            onClick={() => 
                                changeactiveCategoryItem('Rainwear') + setfilterMeaning('rainwear')
                            }>Ветровки</li>
                    </ul>
                </div>
                <div className="OptionsBlock">
                    <div className="OptionsBlockHeader">Классификация</div>
                    <div className="UlOptions Classification">
                        <label className="UlOptionItem Classification" for='classNew'><Input name="RadioClassification" onChange={() => setspecMeaning('statusnew')} id="classNew" type="radio"/> <span for='classNew'>Новинки</span></label>
                        <label className="UlOptionItem Classification" for='classPopular'><Input name="RadioClassification" onChange={() => setspecMeaning('statushot')} id="classPopular" type="radio"/> <span for='classPopular'>Популярное</span></label>
                    </div>
                </div>
                {/* <div className="OptionsBlock">
                    <div className="OptionsBlockHeader">Цвет</div>
                    <ul className="UlOptions ProductItemColors">
                        <li className="UlOptionItem ProductItemColor"><Input className="ProductColor ProductColorBlack" type="checkbox"/></li>
                        <li className="UlOptionItem ProductItemColor"><Input className="ProductColor ProductColorBrown" type="checkbox"/></li>
                        <li className="UlOptionItem ProductItemColor"><Input className="ProductColor ProductColorWhite" type="checkbox"/></li>
                    </ul>
                </div> */}
                {/* <div className="OptionsBlock">
                    <div className="OptionsBlockHeader">Размер</div>
                    <div className="UlOptions ProductSizes">
                        <label className="UlOptionItem ProductSize" id="ProductSize44"><Input id="ProductSize44" type="checkbox"/> <span>44</span></label>
                        <label className="UlOptionItem ProductSize" id="ProductSize48"><Input id="ProductSize48" type="checkbox"/> <span>48</span></label>
                        <label className="UlOptionItem ProductSize" id="ProductSize50"><Input id="ProductSize50" type="checkbox"/> <span>50</span></label>
                        <label className="UlOptionItem ProductSize" id="ProductSize52"><Input id="ProductSize52" type="checkbox"/> <span>52</span></label>
                        <label className="UlOptionItem ProductSize" id="ProductSize54"><Input id="ProductSize54" type="checkbox"/> <span>54</span></label>
                    </div>
                </div> */}
            </div>
        </div>
    )
}