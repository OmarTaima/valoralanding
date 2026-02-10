import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from '../i18n/hooks/useTranslation';
import { getJobPositions } from '../store/slices/jobPositionsSlice';
import valoraLogo from '../assets/logos/Valora Logo.png';

const JobApplicationForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, isArabic } = useTranslation();
  const { positions, loading } = useSelector((state) => state.jobPositions);

  const [repeatableGroups, setRepeatableGroups] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobPosition = positions.find((pos) => pos.slug === slug);

  useEffect(() => {
    if (positions.length === 0) {
      dispatch(getJobPositions());
    }
  }, [dispatch, positions.length]);

  useEffect(() => {
    if (jobPosition) {
      const groups = {};
      jobPosition.customFields
        ?.filter((field) => field.inputType === 'groupField' || field.inputType === 'repeatable_group')
        .forEach((field) => {
          const fieldKey = field.name || field.fieldId;
          groups[fieldKey] = [{}];
        });
      setRepeatableGroups(groups);
    }
  }, [jobPosition]);

  // Helper function to get the field key (convert label to readable key)
  const getFieldKey = (field) => {
    const labelText = getLocalizedText(field.label);
    if (!labelText) return field.fieldId; // Fallback to fieldId if no label
    
    // Convert label to snake_case readable key
    return labelText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0600-\u06FF]/g, '') // Remove special chars but keep Arabic
      .replace(/\s+/g, '_'); // Replace spaces with underscores
  };

  const getLocalizedText = (field) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      return isArabic ? (field.ar || field.en || '') : (field.en || field.ar || '');
    }
    return '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const scrollToFirstError = (errors) => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      let fieldName = firstErrorKey;
      
      // Handle nested errors (customResponses.fieldName)
      if (firstErrorKey === 'customResponses' && typeof errors[firstErrorKey] === 'object') {
        const nestedKey = Object.keys(errors[firstErrorKey])[0];
        fieldName = `customResponses.${nestedKey}`;
      }
      
      // Try to find the field by name attribute
      const errorElement = document.querySelector(`[name="${fieldName}"]`) ||
        document.querySelector(`[name="${firstErrorKey}"]`) ||
        document.querySelector(`[data-error="${firstErrorKey}"]`);
      
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus the field after scrolling
        setTimeout(() => {
          errorElement.focus();
        }, 300);
      }
    }
  };

  const uploadToCloudinary = async (file) => {
    const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    if (!API_KEY || !API_SECRET || !CLOUD_NAME) {
      throw new Error('Cloudinary credentials not configured');
    }

    // Use signed upload (no preset needed)
    const isImage = file.type.startsWith('image/');
    const uploadUrl = isImage 
      ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
      : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'JobApplications';
    
    // Create signature string (params in alphabetical order)
    const signatureString = `folder=${folder}&timestamp=${timestamp}${API_SECRET}`;
    
    // Generate SHA-1 hash (using browser's crypto API)
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
    formData.append('api_key', API_KEY);

    try {
      console.debug('Uploading to:', uploadUrl);
      const response = await axios.post(uploadUrl, formData);
      return response.data.secure_url;
    } catch (error) {
      console.debug('Upload failed:', error.response?.data || error.message);
      console.debug('Upload error details:', error);
      const serverMessage = error.response?.data?.error?.message || error.message;
      throw new Error(`File upload failed: ${serverMessage}`);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const createValidationSchema = () => {
    let schema = Yup.object().shape({
      fullName: Yup.string().required(`${t('joinUs:fullName') || 'Full Name'} ${t('joinUs:isRequired') || 'is required'}`),
      email: Yup.string()
        .email(t('joinUs:invalidEmail') || 'Invalid email')
        .required(`${t('joinUs:email') || 'Email'} ${t('joinUs:isRequired') || 'is required'}`),
      phone: Yup.string()
        .matches(/^(\+\d{1,3}[- ]?)?\d{10,15}$/, t('joinUs:invalidPhone') || 'Invalid phone number')
        .required(`${t('joinUs:phone') || 'Phone'} ${t('joinUs:isRequired') || 'is required'}`),
      address: Yup.string().required(`${t('joinUs:address') || 'Address'} ${t('joinUs:isRequired') || 'is required'}`),
      agreedToTerms: Yup.boolean()
        .oneOf([true], t('joinUs:acceptTerms') || 'You must accept the terms')
        .required(t('joinUs:acceptTerms') || 'You must accept the terms'),
      customResponses: Yup.object(),
    });

    jobPosition?.customFields?.forEach((field) => {
      if (field.isRequired && field.inputType !== 'groupField' && field.inputType !== 'repeatable_group') {
        const fieldKey = getFieldKey(field);
        const fieldLabel = getLocalizedText(field.label);
        if (field.inputType === 'tags') {
          schema = schema.shape({
            customResponses: Yup.object().shape({
              [fieldKey]: Yup.array()
                .min(1, `${fieldLabel} ${t('joinUs:isRequired') || 'is required'}`)
                .required(`${fieldLabel} ${t('joinUs:isRequired') || 'is required'}`),
            }),
          });
        } else {
          schema = schema.shape({
            customResponses: Yup.object().shape({
              [fieldKey]: Yup.mixed().required(`${fieldLabel} ${t('joinUs:isRequired') || 'is required'}`),
            }),
          });
        }
      }
    });

    return schema;
  };

  const handleRepeatableGroupChange = (groupId, index, subFieldId, value) => {
    setRepeatableGroups((prev) => {
      const newGroups = { ...prev };
      if (!newGroups[groupId]) newGroups[groupId] = [{}];
      if (!newGroups[groupId][index]) newGroups[groupId][index] = {};
      newGroups[groupId][index][subFieldId] = value;
      return newGroups;
    });
  };

  const addRepeatableGroup = (groupId) => {
    setRepeatableGroups((prev) => ({
      ...prev,
      [groupId]: [...(prev[groupId] || []), {}],
    }));
  };

  const removeRepeatableGroup = (groupId, index) => {
    setRepeatableGroups((prev) => ({
      ...prev,
      [groupId]: prev[groupId].filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);

    try {
      const finalCustomResponses = { ...values.customResponses };
      Object.keys(repeatableGroups).forEach((groupId) => {
        const groups = repeatableGroups[groupId];
        if (groups && Array.isArray(groups) && groups.length > 0) {
          const validGroups = groups.filter((group) =>
            Object.values(group).some((value) => value && value.toString().trim() !== '')
          );
          if (validGroups.length > 0) {
            finalCustomResponses[groupId] = validGroups;
          }
        }
      });

      // Upload files to Cloudinary first
      let profilePhotoUrl = '';
      let cvUrl = '';

      if (values.profilePhotoFile) {
        Swal.fire({
          title: t('joinUs:uploadingPhoto') || 'Uploading photo...',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });
        profilePhotoUrl = await uploadToCloudinary(values.profilePhotoFile);
        Swal.close();
      }

      if (values.cvFile) {
        Swal.fire({
          title: t('joinUs:uploadingCV') || 'Uploading CV...',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading(); }
        });
        cvUrl = await uploadToCloudinary(values.cvFile);
        Swal.close();
      }

      // Use the base URL from env only
      const FORM_API_URL = import.meta.env.VITE_FORM_URL;
      if (!FORM_API_URL) {
        throw new Error('VITE_FORM_URL is not set in environment');
      }

      // Send JSON payload with Cloudinary URLs
      const payload = {
        jobPositionId: jobPosition._id,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        profilePhoto: profilePhotoUrl,
        cvFilePath: cvUrl,
        customResponses: finalCustomResponses,
      };

      

      const response = await axios.post(`${FORM_API_URL}/public/applicants`, payload);


      await Swal.fire({
        icon: 'success',
        title: t('joinUs:success') || 'Success!',
        text: response?.data?.message || t('joinUs:applicationSubmitted') || 'Application submitted successfully!',
        confirmButtonText: t('common:ok') || 'OK',
        confirmButtonColor: '#10b981',
      });

      navigate('/join-us');
    } catch (error) {
      console.debug('Error submitting application:', error);
      console.debug('Error response:', error.response?.data);
      await Swal.fire({
        icon: 'error',
        title: t('joinUs:error') || 'Error',
        text: error.response?.data?.message || t('joinUs:submissionError') || 'Failed to submit application',
        confirmButtonText: t('common:ok') || 'OK',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 md:py-32 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white dark:bg-dark-900 p-8 rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-light-200 border-t-primary-600 mx-auto"></div>
          <p className="mt-6 text-light-700 dark:text-light-300 font-semibold text-lg">
            {t('joinUs:loading') || 'Loading...'}
          </p>
        </div>
      </section>
    );
  }

  if (!jobPosition) {
    return (
      <section className="py-20 md:py-32 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white dark:bg-dark-900 p-12 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-3">
            {t('joinUs:jobNotFound') || 'Job Position Not Found'}
          </h2>
          <p className="text-light-600 dark:text-light-400 mb-6">
            {t('joinUs:jobNotFoundDesc') || 'The job position you are looking for does not exist.'}
          </p>
          <button onClick={() => navigate('/join-us')} className="btn-primary">
            {t('joinUs:backToJobs') || 'Back to Job Positions'}
          </button>
        </div>
      </section>
    );
  }

  if (!jobPosition.isActive || new Date(jobPosition.registrationEnd) < new Date()) {
    return (
      <section className="py-20 md:py-32 min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-dark-900 p-12 rounded-2xl shadow-lg max-w-md text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            {t('joinUs:applicationsClosed') || 'Applications Closed'}
          </h2>
          <p className="text-light-600 dark:text-light-400 text-lg">
            {!jobPosition.isActive
              ? t('joinUs:inactiveJob') || 'This position is no longer active.'
              : t('joinUs:registrationEnded') || 'Registration period has ended.'}
          </p>
        </div>
      </section>
    );
  }

  const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePhotoFile: null,
    cvFile: null,
    agreedToTerms: false,
    customResponses: jobPosition?.customFields?.reduce((acc, field) => {
      const fieldKey = getFieldKey(field);
      if (field.inputType === 'tags') {
        acc[fieldKey] = [];
      } else if (field.inputType === 'repeatable_group') {
        acc[fieldKey] = [];
      } else if (field.inputType === 'groupField') {
        acc[fieldKey] = {};
      } else {
        acc[fieldKey] = '';
      }
      return acc;
    }, {}) || {},
  };

  return (
    <>
      <Helmet>
        <title>{jobPosition ? `Apply for ${jobPosition.title || jobPosition.name} - VALORA` : 'Job Application - VALORA'}</title>
        <meta name="description" content={jobPosition ? `Apply for the position of ${jobPosition.title || jobPosition.name} at VALORA.` : 'Submit your job application to join the VALORA team.'} />
        <meta property="og:title" content={jobPosition ? `Apply for ${jobPosition.title || jobPosition.name} - VALORA` : 'Job Application - VALORA'} />
      </Helmet>
      <section className="py-20 md:py-32 relative overflow-hidden min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 md:px-6 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/join-us')}
            className="mb-8 flex items-center gap-2 text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">{t('joinUs:backToJobs') || 'Back to Job Positions'}</span>
          </button>

          {/* Job Header Card */}
          <div className="glass rounded-2xl p-8 mb-8 text-center">
            <img src={valoraLogo} alt="Valora Logo" className="w-48 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary-500 mb-4">
              {getLocalizedText(jobPosition.title)}
            </h1>
            <p className="text-light-600 dark:text-light-400 mb-3">
              {jobPosition.companyId.name} • {jobPosition.departmentId?.name || ''}
            </p>
            {jobPosition.salaryVisible && jobPosition.salary && (
              <p className="text-success-600 font-semibold mb-3">
                {t('joinUs:salary') || 'Salary'}: {jobPosition.salary.toLocaleString()} {t('joinUs:egp') || 'EGP'}
              </p>
            )}
            <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-light-600 dark:text-light-400">
              <span>
                {t('joinUs:deadline') || 'Apply before'}: {formatDate(jobPosition.registrationEnd)}
              </span>
              <span>•</span>
              <span>
                {jobPosition.openPositions} {t('joinUs:openings') || 'openings'}
              </span>
            </div>
          </div>

          {/* Job Description */}
          {jobPosition.description && Object.keys(jobPosition.description).length > 0 && (
            <div className="mb-6 p-6 glass rounded-xl border-l-4 border-primary-600">
              <h3 className="font-bold text-lg text-light-800 dark:text-white mb-3">
                {t('joinUs:jobDescription') || 'Job Description'}
              </h3>
              <p className="text-light-600 dark:text-light-300 leading-relaxed">
                {getLocalizedText(jobPosition.description)}
              </p>
            </div>
          )}

          {/* Job Specifications */}
          {jobPosition.jobSpecs && jobPosition.jobSpecs.length > 0 && (
            <div className="mb-6 p-6 glass rounded-xl border-l-4 border-primary-600">
              <h3 className="font-bold text-lg text-light-800 dark:text-white mb-4">
                {t('joinUs:jobSpecs') || 'Job Specifications'}
              </h3>
              <div className="space-y-2">
                {jobPosition.jobSpecs.map((spec, index) => (
                  <div key={spec._id || index} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-light-700 dark:text-light-300">
                      {getLocalizedText(spec.spec)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={createValidationSchema}
            onSubmit={handleFormSubmit}
            validateOnMount={false}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, setTouched, validateForm, isSubmitting: formikIsSubmitting }) => {
              const handleSubmitWithScroll = async (e) => {
                e.preventDefault();
                const formErrors = await validateForm();
                
                const touchedFields = {};
                Object.keys(values).forEach((key) => {
                  touchedFields[key] = true;
                });
                if (values.customResponses) {
                  Object.keys(values.customResponses).forEach((key) => {
                    touchedFields[`customResponses.${key}`] = true;
                  });
                }
                setTouched(touchedFields, false);

                if (Object.keys(formErrors).length > 0) {
                  console.debug('Form Errors:', formErrors);
                  
                  // Scroll to the error field first
                  scrollToFirstError(formErrors);
                  
                  // Get the first error message (handle nested errors)
                  let firstErrorMessage = '';
                  const firstErrorKey = Object.keys(formErrors)[0];
                  
                  if (firstErrorKey === 'customResponses' && typeof formErrors[firstErrorKey] === 'object') {
                    const nestedKey = Object.keys(formErrors[firstErrorKey])[0];
                    firstErrorMessage = formErrors[firstErrorKey][nestedKey];
                  } else {
                    firstErrorMessage = formErrors[firstErrorKey];
                  }
                  
                  // Show alert after a brief delay to allow scroll to complete
                  setTimeout(async () => {
                    await Swal.fire({
                      icon: 'warning',
                      title: t('joinUs:validationError') || 'Validation Error',
                      text: firstErrorMessage,
                      confirmButtonText: t('common:ok') || 'OK',
                      confirmButtonColor: '#f59e0b',
                    });
                  }, 300);
                  return;
                }

                handleFormSubmit(values, { setSubmitting: () => {} });
              };

              return (
                <Form className="glass rounded-2xl p-8" onSubmit={handleSubmitWithScroll}>
                  <h2 className="text-2xl font-bold text-light-900 dark:text-white mb-6">
                    {t('joinUs:applicationForm') || 'Application Form'}
                  </h2>

                  {/* Profile Photo Upload - Circular */}
                  <div className="flex justify-center mb-8">
                    <input
                      type="file"
                      id="profile-photo-upload"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFieldValue('profilePhotoFile', e.target.files[0]);
                        }
                      }}
                    />
                    <label htmlFor="profile-photo-upload" className="cursor-pointer group">
                      <div className="relative w-28 h-28">
                        {values.profilePhotoFile ? (
                          <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all">
                            <img
                              src={URL.createObjectURL(values.profilePhotoFile)}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 rounded-full bg-primary-50 border-4 border-dashed border-primary-400 flex items-center justify-center group-hover:border-primary-600 group-hover:shadow-xl transition-all">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-primary-600 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <div className="absolute bottom-2 right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-center mt-3 text-light-700 dark:text-light-300 group-hover:text-primary-600 font-semibold transition-colors">
                        {values.profilePhotoFile ? t('joinUs:changePhoto') || 'Change Photo' : t('joinUs:uploadPhoto') || 'Upload Photo'}
                      </p>
                    </label>
                  </div>

                  {/* Personal Information Section */}
                  <div className="md:col-span-2 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gradient-to-r from-primary-500/20 via-primary-500/40 to-primary-500/20"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-dark-900 px-6 py-2 rounded-full border-2 border-primary-500/30">
                          <h3 className="text-xl font-bold text-primary-500">
                            {t('joinUs:personalInfo') || 'Personal Information'}
                          </h3>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Full Name */}
                    <div className="md:col-span-2 group">
                      <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {t('joinUs:fullName') || 'Full Name'} <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      <Field
                        name="fullName"
                        type="text"
                        placeholder={t('joinUs:fullName') || 'Full Name'}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                      />
                      {errors.fullName && touched.fullName && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {t('joinUs:email') || 'Email'} <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder={t('joinUs:email') || 'Email'}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {t('joinUs:phone') || 'Phone'} <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder={t('joinUs:phone') || 'Phone'}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

  

                    {/* Address */}
                    <div className="md:col-span-2 group">
                      <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {t('joinUs:address') || 'Address'} <span className="text-red-500 ml-1">*</span>
                        </div>
                      </label>
                      <Field
                        as="textarea"
                        name="address"
                        rows={3}
                        placeholder={t('joinUs:address') || 'Address'}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200 resize-y"
                      />
                      {errors.address && touched.address && (
                        <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>

                    

                    
                  </div>

                  {/* CV Upload - Circular */}
                  <div className="flex justify-center mb-8">
                    <input
                      type="file"
                      id="cv-upload"
                      accept=".pdf,.doc,.docx"
                      hidden
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFieldValue('cvFile', e.target.files[0]);
                        }
                      }}
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer group">
                      <div className="relative w-28 h-28">
                        {values.cvFile ? (
                          <div className="w-28 h-28 rounded-full shadow-xl group-hover:shadow-2xl transition-all bg-success-50 flex flex-col items-center justify-center p-2">
                            <svg className="w-10 h-10 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs text-success-700 font-semibold mt-1 text-center break-words w-full px-1" title={values.cvFile.name}>
                              {values.cvFile.name.length > 15 ? values.cvFile.name.substring(0, 12) + '...' : values.cvFile.name}
                            </p>
                          </div>
                        ) : (
                          <div className="w-28 h-28 rounded-full bg-secondary-50 border-4 border-dashed border-secondary-400 flex items-center justify-center group-hover:border-secondary-600 group-hover:shadow-xl transition-all">
                            <div className="text-center">
                              <svg className="w-12 h-12 text-secondary-600 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                              </svg>
                              <div className="absolute bottom-2 right-2 w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-center mt-3 text-light-700 dark:text-light-300 group-hover:text-secondary-600 font-semibold transition-colors">
                        {values.cvFile ? t('joinUs:changeCV') || 'Change CV' : t('joinUs:uploadCV') || 'Upload CV'}
                      </p>
                    </label>
                  </div>

                  {/* Dynamic Custom Fields */}
                  {jobPosition.customFields && jobPosition.customFields.length > 0 && (
                    <>
                      <div className="md:col-span-2 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-gradient-to-r from-primary-500/20 via-primary-500/40 to-primary-500/20"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="bg-white dark:bg-dark-900 px-6 py-2 rounded-full border-2 border-primary-500/30">
                              <h3 className="text-xl font-bold text-primary-500">
                                {t('joinUs:additionalInfo') || 'Additional Information'}
                              </h3>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6 mb-8">
                        {jobPosition.customFields.map((field) => {
                          const fieldKey = getFieldKey(field);
                          const fieldName = `customResponses.${fieldKey}`;

                          if ((field.inputType === 'groupField' || field.inputType === 'repeatable_group') && field.groupFields) {
                            return (
                              <div key={fieldKey} className="w-full">
                                <div className="p-6 rounded-2xl bg-primary-500/5 border-2 border-primary-500/20">
                                  <h4 className="text-lg font-bold text-light-900 dark:text-white mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-primary-500 rounded-full"></div>
                                    {getLocalizedText(field.label)}
                                    {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                                  </h4>
                                  
                                  {repeatableGroups[fieldKey]?.map((group, groupIndex) => (
                                    <div key={groupIndex} className="mb-4 p-4 bg-white dark:bg-dark-800 rounded-xl border border-light-200 dark:border-dark-600">
                                      <div className="grid grid-cols-1 gap-4 mb-3">
                                        {field.groupFields.map((subField) => {
                                          const subFieldKey = getFieldKey(subField);
                                          return (
                                          <div key={subFieldKey}>
                                            <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">
                                              {getLocalizedText(subField.label)}
                                              {subField.isRequired && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            <input
                                              type={subField.inputType || 'text'}
                                              value={group[subFieldKey] || ''}
                                              onChange={(e) => handleRepeatableGroupChange(fieldKey, groupIndex, subFieldKey, e.target.value)}
                                              required={subField.isRequired}
                                              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                                            />
                                          </div>
                                          );
                                        })}
                                      </div>
                                      {repeatableGroups[fieldKey].length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => removeRepeatableGroup(fieldKey, groupIndex)}
                                          className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1"
                                        >
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                          {t('joinUs:remove') || 'Remove'}
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                  
                                  <button
                                    type="button"
                                    onClick={() => addRepeatableGroup(fieldKey)}
                                    className="mt-3 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    {t('joinUs:addMore') || 'Add More'}
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div key={fieldKey}>
                              <label className="block text-sm font-semibold text-light-900 dark:text-white mb-2">{getLocalizedText(field.label)}
                                {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                              </label>

                              {['text', 'email', 'number', 'date', 'url'].includes(field.inputType) && (
                                <>
                                  <Field
                                    name={fieldName}
                                    type={field.inputType}
                                    placeholder={getLocalizedText(field.label)}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                                  />
                                  {errors.customResponses?.[fieldKey] && touched.customResponses?.[fieldKey] && (
                                    <p className="mt-1 text-sm text-red-500">{errors.customResponses[fieldKey]}</p>
                                  )}
                                </>
                              )}

                              {field.inputType === 'textarea' && (
                                <>
                                  <Field
                                    as="textarea"
                                    name={fieldName}
                                    rows={4}
                                    placeholder={getLocalizedText(field.label)}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200 resize-y"
                                  />
                                  {errors.customResponses?.[fieldKey] && touched.customResponses?.[fieldKey] && (
                                    <p className="mt-1 text-sm text-red-500">{errors.customResponses[fieldKey]}</p>
                                  )}
                                </>
                              )}

                              {field.inputType === 'dropdown' && field.choices && (
                                <>
                                  <Field
                                    as="select"
                                    name={fieldName}
                                    value={values.customResponses?.[fieldKey] ?? ''}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200 cursor-pointer"
                                  >
                                    <option value="" disabled>
                                      {t('joinUs:selectPlaceholder') || getLocalizedText(field.label)}
                                    </option>
                                    {field.choices.map((choice, idx) => (
                                      <option key={idx} value={getLocalizedText(choice)}>
                                        {getLocalizedText(choice)}
                                      </option>
                                    ))}
                                  </Field>
                                  {errors.customResponses?.[fieldKey] && touched.customResponses?.[fieldKey] && (
                                    <p className="mt-1 text-sm text-red-500">{errors.customResponses[fieldKey]}</p>
                                  )}
                                </>
                              )}

                              {field.inputType === 'radio' && field.choices && (
                                <div className="space-y-2">
                                  {field.choices.map((choice, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                      <div className="relative flex items-center shrink-0">
                                        <Field
                                          type="radio"
                                          name={fieldName}
                                          value={getLocalizedText(choice)}
                                          className="sr-only peer"
                                        />
                                        <div className="w-6 h-6 rounded-full bg-white dark:bg-dark-800 peer-checked:bg-primary-500 peer-focus:ring-4 peer-focus:ring-primary-500/20 transition-all duration-300 flex items-center justify-center group-hover:scale-105 peer-checked:[&>div]:scale-100 shadow-md">
                                          <div className="w-2.5 h-2.5 bg-white rounded-full scale-0 transition-transform duration-200"></div>
                                        </div>
                                      </div>
                                      <span className="flex-1 text-sm font-medium text-light-900 dark:text-white select-none">{getLocalizedText(choice)}</span>
                                    </label>
                                  ))}
                                  {errors.customResponses?.[fieldKey] && touched.customResponses?.[fieldKey] && (
                                    <p className="mt-1 text-sm text-red-500">{errors.customResponses[fieldKey]}</p>
                                  )}
                                </div>
                              )}

                              {field.inputType === 'checkbox' && (
                                <label className="flex items-start gap-3 cursor-pointer group">
                                  <div className="relative flex items-center shrink-0 mt-0.5">
                                    <Field
                                      type="checkbox"
                                      name={fieldName}
                                      className="sr-only peer"
                                    />
                                    <div className="w-6 h-6 rounded-lg bg-white dark:bg-dark-800 peer-checked:bg-primary-500 peer-focus:ring-4 peer-focus:ring-primary-500/20 transition-all duration-300 flex items-center justify-center group-hover:scale-105 peer-checked:[&>svg]:scale-100 shadow-md">
                                      <svg className="w-4 h-4 text-white scale-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  </div>
                                  <span className="flex-1 text-sm font-medium text-light-900 dark:text-white select-none">{getLocalizedText(field.label)}</span>
                                </label>
                              )}

                              {field.inputType === 'tags' && (
                                <div>
                                  <div className="flex gap-2 mb-3">
                                    <input
                                      type="text"
                                      placeholder={t('joinUs:tagsPlaceholder') || 'Enter a tag'}
                                      className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-dark-800 border-2 border-light-200 dark:border-dark-600 text-light-900 dark:text-white placeholder-light-400 dark:placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-200"
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          const value = e.target.value.trim();
                                          if (value) {
                                            const currentTags = values.customResponses?.[fieldKey] || [];
                                            const tagsArray = Array.isArray(currentTags) ? currentTags : [];
                                            if (!tagsArray.includes(value)) {
                                              setFieldValue(fieldName, [...tagsArray, value]);
                                            }
                                            e.target.value = '';
                                          }
                                        }
                                      }}
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        const input = e.target.previousElementSibling;
                                        const value = input.value.trim();
                                        if (value) {
                                          const currentTags = values.customResponses?.[fieldKey] || [];
                                          const tagsArray = Array.isArray(currentTags) ? currentTags : [];
                                          if (!tagsArray.includes(value)) {
                                            setFieldValue(fieldName, [...tagsArray, value]);
                                          }
                                          input.value = '';
                                        }
                                      }}
                                      className="px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shrink-0"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                      </svg>
                                      {t('joinUs:addTag') || 'Add'}
                                    </button>
                                  </div>
                                  {values.customResponses?.[fieldKey] && Array.isArray(values.customResponses[fieldKey]) && values.customResponses[fieldKey].length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                      {values.customResponses[fieldKey].map((tag, idx) => (
                                        <div
                                          key={idx}
                                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border-2 border-primary-500/30 rounded-full text-sm font-medium text-light-900 dark:text-white"
                                        >
                                          <span>{tag}</span>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newTags = values.customResponses[fieldKey].filter((_, i) => i !== idx);
                                              setFieldValue(fieldName, newTags);
                                            }}
                                            className="hover:text-red-500 transition-colors"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  <p className="text-xs text-light-500 dark:text-light-400">
                                    {t('joinUs:tagsHint') || 'Press Enter or click Add button to add tags'}
                                  </p>
                                  {errors.customResponses?.[fieldKey] && touched.customResponses?.[fieldKey] && (
                                    <p className="mt-1 text-sm text-red-500">{errors.customResponses[fieldKey]}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Terms and Conditions */}
                  {jobPosition.termsAndConditions && jobPosition.termsAndConditions.length > 0 && (
                    <div className="mb-8">
                      <div className="p-6 bg-light-50 dark:bg-dark-800 rounded-xl border-2 border-light-200 dark:border-dark-600">
                        <h3 className="font-bold text-lg text-light-800 dark:text-white mb-4">
                          {t('joinUs:termsAndConditions') || 'Terms and Conditions'}
                        </h3>
                        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                          {jobPosition.termsAndConditions.map((term, index) => (
                            <div key={term._id || index} className="flex items-start gap-2">
                              <span className="shrink-0 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-sm text-light-700 dark:text-light-300">
                                {getLocalizedText(term)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative flex items-center shrink-0 mt-0.5">
                            <Field
                              type="checkbox"
                              name="agreedToTerms"
                              className="sr-only peer"
                            />
                            <div className="w-6 h-6 rounded-lg bg-white dark:bg-dark-800 peer-checked:bg-primary-500 peer-focus:ring-4 peer-focus:ring-primary-500/20 transition-all duration-300 flex items-center justify-center group-hover:scale-105 peer-checked:[&>svg]:scale-100 shadow-md">
                              <svg className="w-4 h-4 text-white scale-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <span className="flex-1 font-medium text-light-900 dark:text-white select-none">
                            {t('joinUs:iAgree') || 'I agree to the terms and conditions'} <span className="text-red-500">*</span>
                          </span>
                        </label>
                        {errors.agreedToTerms && touched.agreedToTerms && (
                          <p className="mt-2 text-sm text-red-500">{errors.agreedToTerms}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-8 pt-6">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-gradient-to-r from-primary-500/20 via-primary-500/40 to-primary-500/20"></div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={formikIsSubmitting || isSubmitting}
                      className="w-full px-8 py-4 rounded-xl bg-primary-500 text-white font-bold text-lg shadow-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-3"
                    >
                      {formikIsSubmitting || isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>{t('joinUs:submitting') || 'Submitting...'}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{t('joinUs:submitApplication') || 'Submit Application'}</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default JobApplicationForm;
