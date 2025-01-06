import React from 'react';
import Card from '../../components/card/Card';


const CardView = ({ data, handleUseAction }) => {
    return (
        <div className="m-2 p-2 bg-grey-cardBg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-lg">
            {data?.map((user: any) => (
                <Card key={user.id} user={user} handleUseAction={handleUseAction} />
            ))}
        </div>
    );
};

export default CardView;
