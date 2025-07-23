import { useState } from 'react';
import { HiOutlineSparkles, HiOutlinePencilSquare, HiCheck, HiXMark, HiPlus } from 'react-icons/hi2';

function SkillsCard({ skills = [], onFieldUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableSkills, setEditableSkills] = useState([...skills]);
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        if (newSkill && !editableSkills.includes(newSkill)) {
            setEditableSkills([...editableSkills, newSkill]);
            setNewSkill("");
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        setEditableSkills(editableSkills.filter(skill => skill !== skillToDelete));
    };

    const handleSave = () => {
        onFieldUpdate('skills', editableSkills);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditableSkills([...skills]);
        setIsEditing(false);
    };

    return (
        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    <HiOutlineSparkles className="mr-2 inline-block text-blue-500" />
                    Skills
                </h3>
                <button 
                    onClick={isEditing ? handleSave : () => setIsEditing(true)} 
                    className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                    {isEditing ? <><HiCheck className="mr-1 inline"/>Save</> : <><HiOutlinePencilSquare className="mr-1 inline"/>Edit</>}
                </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
                {(isEditing ? editableSkills : skills).map((skill) => (
                    <span key={skill} className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {skill}
                        {isEditing && (
                            <button onClick={() => handleDeleteSkill(skill)} className="rounded-full text-blue-600 transition-colors hover:bg-blue-200 hover:text-blue-800 dark:text-blue-300 dark:hover:bg-blue-800">
                                <HiXMark className="h-4 w-4" />
                            </button>
                        )}
                    </span>
                ))}
                {skills.length === 0 && !isEditing && <p className="text-sm text-gray-500">No skills listed.</p>}
            </div>

            {isEditing && (
                <div className="mt-4 border-t pt-4 dark:border-gray-600">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                            placeholder="Add a new skill"
                            className="flex-grow rounded-md border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <button onClick={handleAddSkill} className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"><HiPlus /></button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SkillsCard;
