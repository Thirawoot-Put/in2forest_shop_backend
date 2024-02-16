const updateController = async (service, data, id) => {
    return await service(data, id);
}

module.exports = updateController