import styled from 'styled-components';

import settings from '../../data/settings.json';

function CoffeeOption(props) {
    const intMaxItem = settings.maxItem;
    let arrIntQtyOptions = [];

    for (let intI = 0; intI <= intMaxItem; intI++) {
        arrIntQtyOptions.push(intI);
    }

    return (
        <Container className="shadow-sm p-3 mb-3 rounded" >
            <div className="row">
                <div className="col-lg-5 col-md-12">
                    <div>
                        <div className="coffee-image"><img src={props.image} alt={props.name} /></div>
                        <div className="coffee-details">
                            <div>
                                <h3>{props.name}</h3>
                                <h5>{props.description}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="coffee-price" >
                        <div><h4 >Php {props.price.toFixed(2)}</h4></div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                    <div className="coffee-qty-hot">
                        <div>
                            <select className="form-control" onChange={(e) => props.onChange(props.name, "hot", e.target.value)}>
                                {arrIntQtyOptions.map((intItem) => <option key={intItem} value={intItem}>{intItem} Hot</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                    <div className="coffee-qty-cold">
                        <div>
                            <select className="form-control" onChange={(e) => props.onChange(props.name, "cold", e.target.value)}>
                                {arrIntQtyOptions.map((intItem) => <option key={intItem} value={intItem}>{intItem} Iced</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default CoffeeOption;

const Container = styled.div`
    background-color: #F9F9F9;
    
    @media only screen and (max-width: 1200px) {
        .coffee-price {
            float: none !important;
            margin: auto;
        }
        
        .coffee-qty-hot {
            float: right !important;
        }

        .coffee-image, .coffee-details {
            text-align: center !important;
            margin: auto !important;
            float: none !important;
        }
    }

    .coffee-qty-hot {
        float: right !important;
    }

    .coffee-checkbox {
        float: left;
        margin: 35px 25px;
        display: none;

        .form-check {
            width: 25;
            height: 25;
        }
    }

    .coffee-image {
        float: left;
        margin: 0 30px 0 10px;

        img {
            width: 75px;
        }
    }

    .coffee-details, .coffee-price, .coffee-qty-hot, .coffee-qty-cold {
        float: left;
        text-align: left;
        display: table;
        height: 100%;

        > div {
            display: table-cell;
            vertical-align: middle;

            h3 {
                color: #AAC27F;
                font-size: calc(2.2 * 1rem);
                font-family: Poppins;
                font-weight: bold;
            }

            h4 {
                color: #AAC27F;
                font-size: calc(2 * 1rem);
                font-family: Poppins;
                font-weight: 500;
            }

            .form-control {
                padding: 0.375rem 0.5rem;
                text-align: center;
            }
        }
    }
`