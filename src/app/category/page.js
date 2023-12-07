'use client'
import { Input } from "reactstrap";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import ProductCard from "../components/ProductCard/ProductCardBestSeller";
import './CategoryPage.sass'

export default function CategoryPage() {
    const router = useRouter();
    const [activeCategoryItem, setactiveCategoryItem] = useState('All');
    const [historyStack, setHistoryStack] = useState([]);

    useEffect(() => {
        const handlePopstate = (event) => {
          // Обрабатываем изменение URL-адреса при нажатии кнопки "назад"
          if (historyStack.length > 0) {
            const previousState = historyStack.pop();
            setactiveCategoryItem(previousState.category);
            setfilterMeaning(previousState.filter);
          }
        };
    
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
      }, [historyStack]);

    const changeactiveCategoryItem = (item) => {
        // Добавляем текущее состояние в стек состояний
        historyStack.push({ category: activeCategoryItem, filter: filterMeaningItem });

        setactiveCategoryItem(item);
        const path = `/category/${item.toLowerCase()}`;
        setfilterMeaning(item.toLowerCase());
        window.history.pushState(null, null, path);
      };

    let[filterMeaningItem, setfilterMeaning] = useState('')
    let[specMeaningItem, setspecMeaning] = useState('')
    
    useEffect(() => {
        document.title = 'Каталог'
      }, []);

    
    return(
        <div className="CategoryPage">
            <div className="container">
                <div className="CategoryPageWrapper">
                    <div className={activeCategoryItem === 'filter-btn' ? "CategoryOptions active" : "CategoryOptions"}>
                        <div className="OptionsWrapper OptionsWrapperDesktop">
                            <div className="OptionsBlock">
                                <div className="OptionsBlockHeader">Категории</div>
                                <ul className="UlOptions Categories">
                                    <li 
                                        className={activeCategoryItem === 'All' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('') + setfilterMeaning('all')
                                        }>Все</li>
                                    <li 
                                        className={activeCategoryItem === 'Puffers' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('Puffers') + setfilterMeaning('puffers')
                                        }>Пуховики</li>
                                    <li 
                                        className={activeCategoryItem === 'Bombers' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('Bombers') + setfilterMeaning('bombers')
                                        }>Бомберы</li>
                                    <li 
                                        className={activeCategoryItem === 'LightweightJackets' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('LightweightJackets') + setfilterMeaning('jacket')
                                        }>Легкие куртки</li>
                                    <li 
                                        className={activeCategoryItem === 'Gilets' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('Gilets') + setfilterMeaning('gilets')
                                        }>Жилеты</li>
                                    <li 
                                        className={activeCategoryItem === 'Coats' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('Coats') + setfilterMeaning('coats')
                                        }>Пальто</li>
                                    <li 
                                        className={activeCategoryItem === 'Rainwear' ? 'UlOptionItem CategoryItem active' : "UlOptionItem CategoryItem"} 
                                        onClick={() => 
                                            changeactiveCategoryItem('Rainwear') + setfilterMeaning('rainwear')
                                        }>Ветровки</li>
                                </ul>
                            </div>
                            <div className="OptionsBlock">
                                <div className="OptionsBlockHeader">Классификация</div>
                                <div className="UlOptions Classification">
                                    <label className="UlOptionItem Classification" for='classAll'><Input checked="checked" name="RadioClassification" onChange={() => {setspecMeaning('')}} id="classAll" type="radio"/> <span for='classAll'>Все</span></label>
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
                    <div className="ProductSlide">
                        <div className="RenderMethodWrapper">
                            <div className="RenderMethod">Сортировка &nbsp; <i class="fa-solid fa-sort"></i></div>
                            <div className="RenderMethod RenderMethodFilter" 
                                onClick={() => changeactiveCategoryItem('filter-btn')
                            }><i class="fa-solid fa-filter"></i></div>
                        </div>
                        <ProductCard specMeaning={specMeaningItem || 'all'} filterMeaning={filterMeaningItem || 'all'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}