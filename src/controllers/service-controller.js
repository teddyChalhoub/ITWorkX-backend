import { response } from "express";
import ServiceModel from "../models/service-models";

exports.getServices = async (req, res) => {
  try {
    const services = await ServiceModel.find();

    if (services.length === 0) throw new Error("No services found");
    res.json({
      success: true,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (e) {
    handleError(e, res);
  }
};

exports.addServices = async (req, res) => {
  try {
    const service = new ServiceModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });

    const newService = await service.save();
    res.json({
      success: true,
      message: "Services added successfully",
      id: newService._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateServices = async (req, res) => {
  try {
    const service = await ServiceModel.findById({ _id: req.params.id });

    if (!service)
      throw new Error(`the service with id ${req.params.id} doesn't exist`);

    if (req.body.title !== undefined && req.body.title !== "") {
      service.title = req.body.title;
    }

    if (req.body.description !== undefined && req.body.description !== "") {
      service.description = req.body.description;
    }
    if (req.body.price !== undefined && req.body.price !== "") {
      service.price = req.body.price;
    }

    const updateService = await service.save();
    res.json({
      success: true,
      message: "Services updated successfully",
      id: updateService._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteServices = async (req, res) => {
  try {
    const service = await ServiceModel.findById({
      _id: req.params.id,
    });
    if (!service) throw new Error("Service doesn't exist");
    const deleteService = await ServiceModel.deleteOne({_id:service._id});
    if (!deleteService.ok)
    throw new Error ("The service isn't successfully deleted")
    res.json({success:true,message:"Service deleted successfully", id:deleteService._id});
  } catch (err) {
    handleError(err, res);
  }
};
const handleError = (err, response) => {
  response.json({ success: false, message: err.message });
};
