import { Company } from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";



export const registerCompany = asyncHandler(async (req, res) => {
    
    const { companyName } = req.body;

    if (!companyName) {
        throw new ApiError(400, "Company name is required.");
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
        throw new ApiError(400, "You can't register same company twice.");
    }

    
    company = await Company.create({
        name: companyName,
        userId: req.id 
    });

    return res.status(201).json(
        new ApiResponse(201, company, "Company registered successfully.")
    );
});


export const getCompany = asyncHandler(async (req, res) => {

    const userId = req.id; 

    const companies = await Company.find({ userId });

    if (!companies) {
        throw new ApiError(404, "Companies not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, companies, "Companies fetched successfully.")
    );
});


export const getCompanyById = asyncHandler(async (req, res) => {
  
    const companyId = req.params.id; 

    const company = await Company.findById(companyId);

    if (!company) {
        throw new ApiError(404, "Company not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, company, "Company details fetched.")
    );
});


export const updateCompany = asyncHandler(async (req, res) => {
    const { name, description, website, location } = req.body;
    
    // Note: Cloudinary (Logo) wala kaam hum "File Handling Day" par karenge.
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const company = await Company.findByIdAndUpdate(req.params.id, 
        {
            name,
            description,
            website,
            location
        }, 
        { new: true }
    );

    if (!company) {
        throw new ApiError(404, "Company not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, company, "Company information updated.")
    );
});
