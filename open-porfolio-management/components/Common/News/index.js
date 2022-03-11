import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { 
    useEffect, 
    useState, 
    useContext 
} from 'react';
import GlobalContext from '../../../lib_client/globalContext';
import React from 'react';
import getNews from '../../../lib_client/getNews';
import { Card } from 'react-bootstrap';
import 'react-vertical-timeline-component/style.min.css';

const News = () => {
    const [dataItem, setData] = useState([]);

    const global = useContext(GlobalContext);
    useEffect(() => {
        if (global.selectedStock) {
            getNews(global.selectedStock.symbol).then((res) => {
                if (res && res.data && res.data.length > 0)
                    setData(res.data[0].reports);
            });
        } else {
            setData([]);
        }
    }, [global.selectedStock]);
    const cardRender = (data) => {
        return (
            <Card className="border-0">
                <Card.Body>
                    <Card.Subtitle className="fw-bold text-white">
                        {data.provider}
                    </Card.Subtitle>
                    <Card.Text className="fw-normal mb-2 d-none d-lg-block">
                        {data.summary.slice(0, 70) + '...'}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div>
            {dataItem.length ? (
                <VerticalTimeline layout="1-column" lineColor="#03a5fc">
                    {dataItem.map((event, index) => (
                        <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            key={index}
                            date={event.publishedOn}
                            iconStyle={{
                                background: 'rgb(33, 150, 243)',
                                color: '#fff',
                            }}
                            contentStyle={{
                                background: 'rgb(33, 150, 243)',
                                color: '#fff',
                            }}
                            contentArrowStyle={{
                                borderRight: '7px solid  rgb(33, 150, 243)',
                            }}
                        >
                            <h3
                                className="vertical-timeline-element-title"
                                dangerouslySetInnerHTML={{
                                    __html: event.title,
                                }}
                            />
                            {cardRender(event)}
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            ) : (
                ''
            )}
        </div>
    );
};
export default News;
