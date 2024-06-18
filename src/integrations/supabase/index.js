import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### hubs

| name  | type | format | required |
|-------|------|--------|----------|
| id    | int8 | number | true     |
| image | text | string | false    |

### main_ports

| name | type | format | required |
|------|------|--------|----------|
| id   | int8 | number | true     |
| name | text | string | false    |

### specific_ports

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| name        | text | string | false    |
| main_port_id| int8 | number | false    |

*/

export const useHubs = () => useQuery({
    queryKey: ['hubs'],
    queryFn: () => fromSupabase(supabase.from('hubs').select('*')),
});
export const useHub = (id) => useQuery({
    queryKey: ['hubs', id],
    queryFn: () => fromSupabase(supabase.from('hubs').select('*').eq('id', id).single()),
});
export const useAddHub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newHub) => fromSupabase(supabase.from('hubs').insert([newHub])),
        onSuccess: () => {
            queryClient.invalidateQueries('hubs');
        },
    });
};
export const useUpdateHub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedHub) => fromSupabase(supabase.from('hubs').update(updatedHub).eq('id', updatedHub.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('hubs');
        },
    });
};
export const useDeleteHub = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('hubs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('hubs');
        },
    });
};

export const useMainPorts = () => useQuery({
    queryKey: ['main_ports'],
    queryFn: () => fromSupabase(supabase.from('main_ports').select('*')),
});
export const useMainPort = (id) => useQuery({
    queryKey: ['main_ports', id],
    queryFn: () => fromSupabase(supabase.from('main_ports').select('*').eq('id', id).single()),
});
export const useAddMainPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMainPort) => fromSupabase(supabase.from('main_ports').insert([newMainPort])),
        onSuccess: () => {
            queryClient.invalidateQueries('main_ports');
        },
    });
};
export const useUpdateMainPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMainPort) => fromSupabase(supabase.from('main_ports').update(updatedMainPort).eq('id', updatedMainPort.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('main_ports');
        },
    });
};
export const useDeleteMainPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('main_ports').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('main_ports');
        },
    });
};

export const useSpecificPorts = () => useQuery({
    queryKey: ['specific_ports'],
    queryFn: () => fromSupabase(supabase.from('specific_ports').select('*')),
});
export const useSpecificPort = (id) => useQuery({
    queryKey: ['specific_ports', id],
    queryFn: () => fromSupabase(supabase.from('specific_ports').select('*').eq('id', id).single()),
});
export const useAddSpecificPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSpecificPort) => fromSupabase(supabase.from('specific_ports').insert([newSpecificPort])),
        onSuccess: () => {
            queryClient.invalidateQueries('specific_ports');
        },
    });
};
export const useUpdateSpecificPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedSpecificPort) => fromSupabase(supabase.from('specific_ports').update(updatedSpecificPort).eq('id', updatedSpecificPort.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('specific_ports');
        },
    });
};
export const useDeleteSpecificPort = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('specific_ports').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('specific_ports');
        },
    });
};