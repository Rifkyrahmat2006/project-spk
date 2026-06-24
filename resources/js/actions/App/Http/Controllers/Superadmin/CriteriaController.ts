import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/superadmin/criteria',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::index
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:16
 * @route '/superadmin/criteria'
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
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/superadmin/criteria/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::create
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/create'
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
* @see \App\Http\Controllers\Superadmin\CriteriaController::store
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:30
 * @route '/superadmin/criteria'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/superadmin/criteria',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::store
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:30
 * @route '/superadmin/criteria'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::store
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:30
 * @route '/superadmin/criteria'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::store
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:30
 * @route '/superadmin/criteria'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::store
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:30
 * @route '/superadmin/criteria'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
export const show = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/superadmin/criteria/{criterion}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
show.url = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { criterion: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    criterion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        criterion: args.criterion,
                }

    return show.definition.url
            .replace('{criterion}', parsedArgs.criterion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
show.get = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
show.head = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
    const showForm = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
        showForm.get = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::show
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}'
 */
        showForm.head = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
export const edit = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/superadmin/criteria/{criterion}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
edit.url = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { criterion: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    criterion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        criterion: args.criterion,
                }

    return edit.definition.url
            .replace('{criterion}', parsedArgs.criterion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
edit.get = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
edit.head = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
    const editForm = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
        editForm.get = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::edit
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:0
 * @route '/superadmin/criteria/{criterion}/edit'
 */
        editForm.head = (args: { criterion: string | number } | [criterion: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
export const update = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/superadmin/criteria/{criterion}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
update.url = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { criterion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { criterion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    criterion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        criterion: typeof args.criterion === 'object'
                ? args.criterion.id
                : args.criterion,
                }

    return update.definition.url
            .replace('{criterion}', parsedArgs.criterion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
update.put = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
update.patch = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
    const updateForm = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
        updateForm.put = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::update
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:60
 * @route '/superadmin/criteria/{criterion}'
 */
        updateForm.patch = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Superadmin\CriteriaController::destroy
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:93
 * @route '/superadmin/criteria/{criterion}'
 */
export const destroy = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/superadmin/criteria/{criterion}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::destroy
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:93
 * @route '/superadmin/criteria/{criterion}'
 */
destroy.url = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { criterion: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { criterion: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    criterion: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        criterion: typeof args.criterion === 'object'
                ? args.criterion.id
                : args.criterion,
                }

    return destroy.definition.url
            .replace('{criterion}', parsedArgs.criterion.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CriteriaController::destroy
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:93
 * @route '/superadmin/criteria/{criterion}'
 */
destroy.delete = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::destroy
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:93
 * @route '/superadmin/criteria/{criterion}'
 */
    const destroyForm = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CriteriaController::destroy
 * @see app/Http/Controllers/Superadmin/CriteriaController.php:93
 * @route '/superadmin/criteria/{criterion}'
 */
        destroyForm.delete = (args: { criterion: number | { id: number } } | [criterion: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CriteriaController = { index, create, store, show, edit, update, destroy }

export default CriteriaController