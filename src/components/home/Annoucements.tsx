import React from 'react';
import { Announcement } from '../../types';

interface AnnoucementsProps {
    annoucements: Announcement[];
}

const Annoucements: React.FC<AnnoucementsProps> = ({ annoucements }) => {

    return (
        <div className="space-y-6">
            <div className="card p-6 bg-white">
                <h3 className="heading-sm text-primary-800 mb-4">Announcements</h3>
                <div className="space-y-4">
                    {annoucements.map((annoucement, index) => (
                        <div className="p-3 border-l-4 border-primary-500 bg-primary-50" key={index}>
                            <p className="font-bold text-gray-800">{annoucement.title}</p>
                            <p className="text-sm text-gray-600">
                                {annoucement.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Annoucements;