import api from './client';
import type { BorrowRequest, CreateBorrowRequestPayload } from './types';

export async function getBorrowRequests(): Promise<BorrowRequest[]> {
  const response = await api.get<BorrowRequest[]>('/requests');
  return response.data;
}

export async function createBorrowRequest(
  payload: CreateBorrowRequestPayload
): Promise<BorrowRequest> {
  const response = await api.post<BorrowRequest>('/borrow', payload);
  return response.data;
}

export async function markRequestAsBorrowed(
  requestId: string
): Promise<BorrowRequest> {
  const response = await api.patch<BorrowRequest>(`/requests/${requestId}/borrow`);
  return response.data;
}

export async function markRequestAsReturned(
  requestId: string
): Promise<BorrowRequest> {
  const response = await api.patch<BorrowRequest>(`/requests/${requestId}/return`);
  return response.data;
}
