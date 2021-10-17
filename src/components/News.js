import { useState, useEffect } from 'react';
import axios from 'axios';
import { CardGroup, Card, Button, Col, Row } from 'react-bootstrap';
import './News.css';

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            const res = await axios.get("https://newsapi.org/v2/top-headlines?country=tr&apiKey=bff784de966a4c399dd37f591fbb2db9");
            setNews(res.data.articles);


        }
        getArticles();
    }, []);

    return (
        <div className='container card-container'>

            <div className='card-grid CardDeck'>
                <Col className="container-fluid mt-4">
                    {news.map((data) => {
                        return (
                            <CardGroup>
                                <Card className='card-position' >
                                    <Card.Img
                                        variant="top"
                                        src={data.urlToImage}
                                        style={{ width: '18rem' }} />
                                    <Card.Body>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Text>{data.description}</Card.Text>
                                        <Button href={data.url} variant="secondary">Devamı...</Button>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Tarih: {data.publishedAt.split('T')[0]}</small>
                                    </Card.Footer>
                                </Card>
                            </CardGroup>
                        )
                    })}
                </Col>
            </div>


        </div>
    )
}



export default News;
