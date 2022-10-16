import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCoffee, faTimesCircle, faShippingFast } from '@fortawesome/free-solid-svg-icons';

import CoffeeOption from './FormControls/CoffeeOption';

import menu from '../data/menu.json';
import settings from '../data/settings.json';

import {
    submitOrder,
} from '../actions/order'

function OrderForm() {
    const arrStrPickUpDayOptions = ["Today", "Tomorrow"];
    let arrObjPickUpTimeOptions = [{ value : Number.MAX_VALUE, display : "ASAP", disabled : false }];
    let objOrders = {}, objCoffees = {};

    menu.forEach((objMenu) => {
        objOrders = Object.assign({ ...objOrders, [objMenu.name]: { hot : 0, cold : 0 } });
        objCoffees = Object.assign({ ...objCoffees, [objMenu.name]: { price : objMenu.price } });
    });

    const [order, setOrder] = useState(objOrders);
    const [coffees, setCoffees] = useState(objCoffees);
    const [pickUpDay, setPickUpDay] = useState("today");
    const [pickUpTime, setPickUpTime] = useState("ASAP");
    const [notes, setNotes] = useState("");
    const [totalQty, setTotalQty] = useState(0);
    const [totalAmt, setTotalAmt] = useState(0);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    for(let intH = settings.minHour; intH <= settings.maxHour; intH++) {
        if (intH === 18) {
            break;
        }
        
        for(let intM = 0; intM < 60; intM += 15) {
            let strA = intH < 12 ? 'AM' : 'PM';
            let intN = intH <= 12 ? intH : (intH % 12);
            let strH = (intN < 10 ? '0' : '') + intN;
            let strM = ((intM % 60) < 10 ? '0' : '') + (intM % 60);
            arrObjPickUpTimeOptions.push({value : (intH * 60) + intM, display : strH + ":" + strM + " " + strA});
        }
    }

    let intNow = new Date();
    let intNowH = intNow.getHours();
    let intNowM = intNow.getMinutes();
    let intNowV = (intNowH * 60) + intNowM;

    useEffect(() => {
        let intTotalQty = 0;
        let intTotalAmt = 0;
        let strError = "";
        
        Object.keys(order).forEach((strKey) => {
            intTotalQty += order[strKey].hot + order[strKey].cold;
            intTotalAmt += coffees[strKey].price * (order[strKey].hot + order[strKey].cold);
        });

        if (intTotalQty > 5) {
            strError = "You have exceeded the maximum no. of items per order (5)!";
        }

        setError(strError);
        setTotalQty(intTotalQty);
        setTotalAmt(intTotalAmt);
     }, [order]);

    const onSubmit = () => {
        let intTotalQty = 0;
        let strError = "";

        Object.keys(order).forEach((strKey) => {
            intTotalQty += order[strKey].hot + order[strKey].cold;
        });

        if (intTotalQty === 0) {
            strError = "You have no orders yet!";
            setError(strError);
            return;
        }

        let data = {
            order,
            pickUpDay,
            pickUpTime,
            notes,
            totalQty,
            totalAmt
        };

        // TODO: Submit the order
        console.log(data);
        // submitOrder(e)
        // .then(res => {
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
        // TODO: Submit the order

        setIsLoading(true);
        setTimeout(function () {
            setSubmitted(true);
        }, 3000);
    };

    const onCoffeeChange = (strName, strTemp, intQty) => {
        setOrder((order) => ({...order, [strName] : {...order[strName], [strTemp] : parseInt(intQty)}}));
    };

    return (
        <div>
            {submitted &&
                <div>
                    <Title>THANK YOU!</Title>
                    <Success className="success-container">
                        <div className="alert alert-success">
                            <FontAwesomeIcon icon={faCoffee} /> We're now preparing your coffee...
                        </div>
                    </Success>
                </div>
            }
            {!submitted &&
                <div>
                    <Title>ORDER FORM</Title>
                    <Container className="form-container">
                        <div className="alert alert-primary">
                            <FontAwesomeIcon icon={faInfoCircle} /> <b>Note:</b> We only accept a maximum of 5 items per order.
                        </div>
                        <form>
                            <hr/>
                            {menu.map((objCoffee, intIndex) => <CoffeeOption key={intIndex} name={objCoffee.name} description={objCoffee.description} price={objCoffee.price} image={objCoffee.image} onChange={(strName, strTemp, intQty) => onCoffeeChange(strName, strTemp, intQty)} />)}
                            <hr/>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label><h5>When are you picking up your order?</h5></label>
                                </div>
                                <div className="col-md-6">
                                    <div className="pickup-day">
                                    <select className="form-control" onChange={(e) => setPickUpDay(e.target.value)}>
                                        {arrStrPickUpDayOptions.map((strPickUpDayOption, intINdex) => <option key={intINdex} value={strPickUpDayOption.toLowerCase()}>{strPickUpDayOption}</option>)}
                                    </select>
                                    </div>
                                    <div className="pickup-time">
                                    <select className="form-control" onChange={(e) => setPickUpTime(e.target.value)}>
                                        {arrObjPickUpTimeOptions.map((objPickUpTimeOption, intIndex) => {
                                            if ((pickUpDay === 'tomorrow' && objPickUpTimeOption.value === Number.MAX_VALUE)
                                                || (pickUpDay === 'today' && objPickUpTimeOption.value < intNowV)) {
                                                return null;
                                            }
                
                                            return <option key={intIndex} value={objPickUpTimeOption.display}>{objPickUpTimeOption.display}</option>
                                        })}
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-6">
                                <label><h5>Do you have additional notes for us?</h5></label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                <textarea className="form-control" rows={5} cols={70} onChange={(e) => setNotes(e.target.value)}></textarea>
                                </div>
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6">
                                    <h3><b>Total Qty:</b> {totalQty}</h3>
                                </div>
                                <div className="col-md-6">
                                    <h3><b>Total Amt: </b> Php {totalAmt.toFixed(2)}</h3>
                                </div>
                            </div>
                            <hr/>
                            <div className="display-block">
                                <div className="float-start">
                                    {error &&
                                        <div className="alert alert-danger"><FontAwesomeIcon icon={faTimesCircle} /> <b>Error: </b> {error}</div>
                                    }
                                </div>
                                <div className="float-end">
                                    <button type="button" className="btn btn-lg btn-primary" disabled={error || isLoading} onClick={(e) => onSubmit()}>
                                        { isLoading &&
                                           <span><FontAwesomeIcon icon={faShippingFast} /> Submitting...</span>
                                        }
                                        { !isLoading &&
                                           <span>Submit Order</span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
            }
        </div>
    );
}

export default OrderForm;

const Title = styled.h1`
  color: #AAC27F;
  font-size: calc(3 * 1rem);
  line-height: calc(1.4 * (1 + (1 - 2.2)/25));
  font-family: Poppins;
  font-weight: bold;
  margin-top: 70px;

  @media only screen and (max-width: 1440px) {
    margin-top: 40px;
  }
`

const Success = styled.div`
    margin: 20px 240px;
    padding: 40px 40px 80px;

    @media only screen and (max-width: 1140px) {
        margin: 20px 100px;
    }

    @media only screen and (max-width: 960px) {
        margin: 20px 30px;
    }

    @media only screen and (max-width: 576px) {
        padding: 40px;
    }
`

const Container = styled.div`
    margin: 20px 100px;
    border: 2px solid #AAC27F;
    border-radius: 10px;
    padding: 40px 40px 80px;
    text-align: left;

    @media only screen and (max-width: 960px) {
        margin: 20px 30px;
    }

    @media only screen and (max-width: 576px) {
        padding: 40px;

        .pickup-day, .pickup-time {
            width: calc(50% - 5px);

            .form-control {
                width: 100%;
            }
        }

        .pickup-time {
            margin-right: 0 !important;
        }

        .float-start, .float-end {
            width: 100%;
            float: none !important;

            button {
                width: 100%;
            }
        }
    }

    hr {
      border: 2px solid #AAC27F;
      margin: 25px 0;
    }

    .pickup-day, .pickup-time {
        float: left;
        margin-right: 10px;
    }

    button {
        background-color: #AAC27F; 
        border-color: #AAC27F;
        padding-bottom: 1rem;
        padding-top: 1rem;

        :disabled {
            background-color: #EAF0DF;
            border-color: #EAF0DF;
        }
    }
`