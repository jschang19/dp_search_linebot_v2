import User from "../models/user.js";

export const addSave = async (lineId, department, saveMode) => {
    const isFull = await checkSaveFull(lineId, saveMode);
    if (isFull) return { isFull: true };
    const newDep = {
        type: saveMode,
        university: department.uni,
        depCode: department.code,
    };

    await User.updateOne({ lineId: lineId }, { $push: { savedDeps: newDep } });
    return { success: true };
};

export const deleteSave = async (lineId, depCode, saveMode) => {
    // to
    const hasSaved = await User.findOne({
        lineId: lineId,
        savedDeps: { $elemMatch: { depCode: depCode, type: saveMode } },
    });

    if (!hasSaved) return { notSaved: true };

    await User.updateOne({ lineId: lineId }, { $pull: { savedDeps: { depCode: depCode, type: saveMode } } });
    return { success: true };
};

export const getSaves = async (lineId, saveMode) => {
    const savedDeps = (await User.findOne({ lineId: lineId }).select("savedDeps")).savedDeps;
    return savedDeps.filter((dep) => dep.type === saveMode);
};

const checkSaveFull = async (lineId, mode) => {
    const savedDeps = (await User.findOne({ lineId: lineId }).select("savedDeps")).savedDeps;
    console.log(savedDeps);
    const department = savedDeps.map((dep) => dep.type === mode);
    console.log(department);
    return department.length >= 10;
};
