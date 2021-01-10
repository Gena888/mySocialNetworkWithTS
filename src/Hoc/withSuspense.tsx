import React, { Suspense } from 'react';
import Preloader from '../components/Common/Preloader/Preloader';

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Preloader />}>
                <WrappedComponent {...props} />
            </React.Suspense>
        )
    }
}

