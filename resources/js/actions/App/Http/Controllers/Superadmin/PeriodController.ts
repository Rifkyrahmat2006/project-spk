import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/superadmin/periods',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::index
 * @see app/Http/Controllers/Superadmin/PeriodController.php:16
 * @route '/superadmin/periods'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/superadmin/periods/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::create
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::store
 * @see app/Http/Controllers/Superadmin/PeriodController.php:28
 * @route '/superadmin/periods'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/superadmin/periods',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::store
 * @see app/Http/Controllers/Superadmin/PeriodController.php:28
 * @route '/superadmin/periods'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::store
 * @see app/Http/Controllers/Superadmin/PeriodController.php:28
 * @route '/superadmin/periods'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::store
 * @see app/Http/Controllers/Superadmin/PeriodController.php:28
 * @route '/superadmin/periods'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::store
 * @see app/Http/Controllers/Superadmin/PeriodController.php:28
 * @route '/superadmin/periods'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
export const show = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/superadmin/periods/{period}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
show.url = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: args.period,
                }

    return show.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
show.get = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
show.head = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
    const showForm = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
        showForm.get = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::show
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}'
 */
        showForm.head = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
export const edit = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/superadmin/periods/{period}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
edit.url = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: args.period,
                }

    return edit.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
edit.get = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
edit.head = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
    const editForm = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
        editForm.get = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::edit
 * @see app/Http/Controllers/Superadmin/PeriodController.php:0
 * @route '/superadmin/periods/{period}/edit'
 */
        editForm.head = (args: { period: string | number } | [period: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
export const update = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/superadmin/periods/{period}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
update.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return update.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
update.put = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
update.patch = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
    const updateForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
        updateForm.put = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::update
 * @see app/Http/Controllers/Superadmin/PeriodController.php:52
 * @route '/superadmin/periods/{period}'
 */
        updateForm.patch = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::destroy
 * @see app/Http/Controllers/Superadmin/PeriodController.php:78
 * @route '/superadmin/periods/{period}'
 */
export const destroy = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/superadmin/periods/{period}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::destroy
 * @see app/Http/Controllers/Superadmin/PeriodController.php:78
 * @route '/superadmin/periods/{period}'
 */
destroy.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return destroy.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::destroy
 * @see app/Http/Controllers/Superadmin/PeriodController.php:78
 * @route '/superadmin/periods/{period}'
 */
destroy.delete = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::destroy
 * @see app/Http/Controllers/Superadmin/PeriodController.php:78
 * @route '/superadmin/periods/{period}'
 */
    const destroyForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::destroy
 * @see app/Http/Controllers/Superadmin/PeriodController.php:78
 * @route '/superadmin/periods/{period}'
 */
        destroyForm.delete = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::lock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:94
 * @route '/superadmin/periods/{period}/lock'
 */
export const lock = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

lock.definition = {
    methods: ["post"],
    url: '/superadmin/periods/{period}/lock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::lock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:94
 * @route '/superadmin/periods/{period}/lock'
 */
lock.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return lock.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::lock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:94
 * @route '/superadmin/periods/{period}/lock'
 */
lock.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::lock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:94
 * @route '/superadmin/periods/{period}/lock'
 */
    const lockForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lock.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::lock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:94
 * @route '/superadmin/periods/{period}/lock'
 */
        lockForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lock.url(args, options),
            method: 'post',
        })
    
    lock.form = lockForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unlock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:110
 * @route '/superadmin/periods/{period}/unlock'
 */
export const unlock = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unlock.url(args, options),
    method: 'post',
})

unlock.definition = {
    methods: ["post"],
    url: '/superadmin/periods/{period}/unlock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unlock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:110
 * @route '/superadmin/periods/{period}/unlock'
 */
unlock.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return unlock.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unlock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:110
 * @route '/superadmin/periods/{period}/unlock'
 */
unlock.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unlock.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::unlock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:110
 * @route '/superadmin/periods/{period}/unlock'
 */
    const unlockForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unlock.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::unlock
 * @see app/Http/Controllers/Superadmin/PeriodController.php:110
 * @route '/superadmin/periods/{period}/unlock'
 */
        unlockForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unlock.url(args, options),
            method: 'post',
        })
    
    unlock.form = unlockForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::publish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:126
 * @route '/superadmin/periods/{period}/publish'
 */
export const publish = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/superadmin/periods/{period}/publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::publish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:126
 * @route '/superadmin/periods/{period}/publish'
 */
publish.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return publish.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::publish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:126
 * @route '/superadmin/periods/{period}/publish'
 */
publish.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::publish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:126
 * @route '/superadmin/periods/{period}/publish'
 */
    const publishForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::publish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:126
 * @route '/superadmin/periods/{period}/publish'
 */
        publishForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unpublish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:141
 * @route '/superadmin/periods/{period}/unpublish'
 */
export const unpublish = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

unpublish.definition = {
    methods: ["post"],
    url: '/superadmin/periods/{period}/unpublish',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unpublish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:141
 * @route '/superadmin/periods/{period}/unpublish'
 */
unpublish.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return unpublish.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::unpublish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:141
 * @route '/superadmin/periods/{period}/unpublish'
 */
unpublish.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: unpublish.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::unpublish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:141
 * @route '/superadmin/periods/{period}/unpublish'
 */
    const unpublishForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unpublish.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::unpublish
 * @see app/Http/Controllers/Superadmin/PeriodController.php:141
 * @route '/superadmin/periods/{period}/unpublish'
 */
        unpublishForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unpublish.url(args, options),
            method: 'post',
        })
    
    unpublish.form = unpublishForm
/**
* @see \App\Http\Controllers\Superadmin\PeriodController::toggleScores
 * @see app/Http/Controllers/Superadmin/PeriodController.php:156
 * @route '/superadmin/periods/{period}/toggle-scores'
 */
export const toggleScores = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleScores.url(args, options),
    method: 'post',
})

toggleScores.definition = {
    methods: ["post"],
    url: '/superadmin/periods/{period}/toggle-scores',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::toggleScores
 * @see app/Http/Controllers/Superadmin/PeriodController.php:156
 * @route '/superadmin/periods/{period}/toggle-scores'
 */
toggleScores.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return toggleScores.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\PeriodController::toggleScores
 * @see app/Http/Controllers/Superadmin/PeriodController.php:156
 * @route '/superadmin/periods/{period}/toggle-scores'
 */
toggleScores.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleScores.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\PeriodController::toggleScores
 * @see app/Http/Controllers/Superadmin/PeriodController.php:156
 * @route '/superadmin/periods/{period}/toggle-scores'
 */
    const toggleScoresForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleScores.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\PeriodController::toggleScores
 * @see app/Http/Controllers/Superadmin/PeriodController.php:156
 * @route '/superadmin/periods/{period}/toggle-scores'
 */
        toggleScoresForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleScores.url(args, options),
            method: 'post',
        })
    
    toggleScores.form = toggleScoresForm
const PeriodController = { index, create, store, show, edit, update, destroy, lock, unlock, publish, unpublish, toggleScores }

export default PeriodController