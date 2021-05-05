import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon } from "@ionic/react";
import { arrowRedoOutline, cartOutline, heartOutline } from "ionicons/icons";
import { addToCart } from "../actions/cartActions";
import styles from "./ProductCard.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { setErrorFlag } from "../actions/dishActions";
import { useHistory } from "react-router-dom";
import { AppState } from "../reducers";

const ProductCard = props => {

    const { product, index } = props;
    const user = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAddToCart = (dish_id) => {
        if(user.isAuthenticated && user.profile!._id !== product.chef._id) {
            const item = {
                dish: dish_id,
                quantity: 1,
            };
            dispatch(addToCart(item));
        } else if(!user.isAuthenticated){
            dispatch(setErrorFlag(true, "You should sign in to purchase."));
        } else if(user.profile!._id === product.chef._id) {
            dispatch(setErrorFlag(true, "This is your product."))
        }
    };

    return (

        <IonCol size="6" key={ `category_product_list_${ index }`}>
            <IonCard  className={ styles.categoryCard }>
                <IonCardHeader className={ styles.productCardHeader } onClick={() => history.push(`/dish/page/${product["_id"]}`)}>
                    <div className={ styles.productCardActions }>
                        <IonIcon className={ styles.productCardAction } size="medium"  icon={heartOutline} />
                        <IonIcon className={ styles.productCardAction } size="medium" icon={ arrowRedoOutline } />
                    </div>
                    <img src={ '/' + product.foodPicture } alt="Product Image" />
                    <p className="ion-text-wrap">{ product.name }</p>
                </IonCardHeader>

                <IonCardContent className={ styles.categoryCardContent }>
                    <div className={ styles.productPrice }>
                        <IonButton style={{ width: "100%" }} color="light">
                            { product.price }
                        </IonButton>
                        <IonButton color="dark" onClick={ e => handleAddToCart(product._id) }>
                            <IonIcon icon={ cartOutline } />
                        </IonButton>
                    </div>
                </IonCardContent>
            </IonCard>
        </IonCol>
    );
}

export default ProductCard;
