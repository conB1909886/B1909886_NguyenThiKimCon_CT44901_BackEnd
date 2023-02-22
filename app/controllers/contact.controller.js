const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.findAll = async(req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.findAll({});
        }
    } catch (error) {
        return next(
            new ApiError(500, " An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "name can not be empty"));

    }
    try {
        const contactService = new ContactService(MongoDB.client);   
        const document = await contactService.create(req.body);
        return res.send(document);

    } catch (error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")

        );

    }
};
   


exports.findALL = (req, res) => {
    res.send({ message: "findALL handler"});

};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});

};

exports.update = (req, res) => {
    res.send({ message: "update handler"});

};

exports.delete = (req, res) => {
    res.send({ message: "delete handler"});

};

exports.deleteALL = (req, res) => {
    res.send({ message: "deleteALL handler"});

};

exports.findALLFavorite = (req, res) => {
    res.send({ message: "findALLFavorite handler"});

};


