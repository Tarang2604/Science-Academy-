import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LeadSubmissionPayload {
  name: string;
  phone: string;
  email?: string;
  targetClass?: string;
  subjects?: string;
  persona?: 'STUDENT' | 'PARENT';
  preferredTiming?: string;
  message?: string;
  type?: 'ADMISSION' | 'DEMO' | 'CONSULTATION' | 'CONTACT';
}

export interface ConsultationWizardPayload {
  persona: 'STUDENT' | 'PARENT';
  targetClass: string;
  primaryGoal: string;
  name: string;
  phone: string;
  preferredTiming?: string;
}

export const submitLead = async (payload: LeadSubmissionPayload) => {
  const response = await apiClient.post('/leads', payload);
  return response.data;
};

export const submitConsultation = async (payload: ConsultationWizardPayload) => {
  const response = await apiClient.post('/consultations', payload);
  return response.data;
};

export const getCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data;
};

export const getCourseBySlug = async (slug: string) => {
  const response = await apiClient.get(`/courses/${slug}`);
  return response.data;
};

// Admin Authentication API Calls
export const loginAdmin = async (payload: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

// Admin Dashboard & Lead Management APIs
export const getAdminDashboardMetrics = async () => {
  const response = await apiClient.get('/admin/dashboard');
  return response.data;
};

export const getAdminLeads = async (params?: { search?: string; status?: string; type?: string; sort?: string }) => {
  const response = await apiClient.get('/admin/leads', { params });
  return response.data;
};

export const updateAdminLead = async (id: string, payload: { status?: string; notes?: string }) => {
  const response = await apiClient.patch(`/admin/leads/${id}`, payload);
  return response.data;
};

export const getAdminConsultations = async (params?: { search?: string; status?: string; sort?: string }) => {
  const response = await apiClient.get('/admin/consultations', { params });
  return response.data;
};

// --- Admin CMS API Calls ---
export const getAdminResults = async (params?: { search?: string; year?: number; status?: string }) => {
  const response = await apiClient.get('/admin/results', { params });
  return response.data;
};

export const createAdminResult = async (payload: any) => {
  const response = await apiClient.post('/admin/results', payload);
  return response.data;
};

export const updateAdminResult = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/results/${id}`, payload);
  return response.data;
};

export const getAdminGallery = async (params?: { category?: string; status?: string }) => {
  const response = await apiClient.get('/admin/gallery', { params });
  return response.data;
};

export const createAdminGallery = async (payload: any) => {
  const response = await apiClient.post('/admin/gallery', payload);
  return response.data;
};

export const updateAdminGallery = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/gallery/${id}`, payload);
  return response.data;
};

export const getAdminCourses = async () => {
  const response = await apiClient.get('/admin/courses');
  return response.data;
};

export const updateAdminCourse = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/courses/${id}`, payload);
  return response.data;
};

export const getAdminFaculty = async () => {
  const response = await apiClient.get('/admin/faculty');
  return response.data;
};

export const updateAdminFaculty = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/faculty/${id}`, payload);
  return response.data;
};

export const getAdminTestimonials = async () => {
  const response = await apiClient.get('/admin/testimonials');
  return response.data;
};

export const updateAdminTestimonial = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/testimonials/${id}`, payload);
  return response.data;
};

export const getAdminStories = async () => {
  const response = await apiClient.get('/admin/stories');
  return response.data;
};

export const updateAdminStory = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/stories/${id}`, payload);
  return response.data;
};

export const getAdminBlog = async () => {
  const response = await apiClient.get('/admin/blog');
  return response.data;
};

export const updateAdminBlog = async (id: string, payload: any) => {
  const response = await apiClient.patch(`/admin/blog/${id}`, payload);
  return response.data;
};

// --- Public Content API Calls ---
export const getPublicResults = async (params?: { year?: number; examName?: string }) => {
  const response = await apiClient.get('/results', { params });
  return response.data;
};

export const getPublicGallery = async (params?: { category?: string }) => {
  const response = await apiClient.get('/gallery', { params });
  return response.data;
};

export const getPublicFaculty = async () => {
  const response = await apiClient.get('/faculty');
  return response.data;
};

export const getPublicTestimonials = async () => {
  const response = await apiClient.get('/testimonials');
  return response.data;
};

export const getPublicStories = async () => {
  const response = await apiClient.get('/stories');
  return response.data;
};

export const getPublicBlog = async () => {
  const response = await apiClient.get('/blog');
  return response.data;
};


