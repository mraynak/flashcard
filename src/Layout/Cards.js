import React, {useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";



function Cards({decks, setDecks}) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const history = useHistory();


    // useEffect(() => {
    //     loadDecks();
    
    //     return() => {
    //       abortController.abort();
    //     };
    //   }, [setDecks]);

    // async function loadDecks() {
    //     try {
    //       const response = await listDecks(signal);
    //       setDecks(response);
    //     } catch (error) {
    //       if (error.name !== "AbortError") {
    //         throw error;
    //       }
    //     }
    //   }

      useEffect(() => {
        async function loadDecks() {
            try {
                const response = await listDecks(signal)
                setDecks(response)
            } catch (error) {
                if(error.name !== "AbortError") {
                    throw error;
                }
            }
        }
        loadDecks()
        
    }, [setDecks])

    async function deleteThisDeck(id) {
        try {
          if(
            window.confirm(
              "Delete this deck?\n\nYou will not be able to recover it."
            )
          ) {
            await deleteDeck(id, signal);
            history.go(0)
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            throw error;
          }
        }
      }


    const list = decks.map((deck, index) => {
        return (
            <li key={index}>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{deck.name}</h2>
                    <h5 className="card-subtitle text-muted">{deck.cards.length} cards</h5>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`}>
                        <button className="btn btn-secondary">View</button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button className="btn btn-primary" type="button">Study</button>
                    </Link>
                </div>
                <button onClick={()=> deleteThisDeck(deck.id)} className="trashBtn btn-danger">Delete</button>
            </div>
            </li>
        )
    })
    return (
        <ul>
            {list}
        </ul>
    )
}

export default Cards;