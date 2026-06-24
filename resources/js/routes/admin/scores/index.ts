import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/scores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ScoreController::index
 * @see app/Http/Controllers/Admin/ScoreController.php:19
 * @route '/admin/scores'
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
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/scores/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ScoreController::create
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/create'
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
* @see \App\Http\Controllers\Admin\ScoreController::store
 * @see app/Http/Controllers/Admin/ScoreController.php:54
 * @route '/admin/scores'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/scores',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::store
 * @see app/Http/Controllers/Admin/ScoreController.php:54
 * @route '/admin/scores'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::store
 * @see app/Http/Controllers/Admin/ScoreController.php:54
 * @route '/admin/scores'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::store
 * @see app/Http/Controllers/Admin/ScoreController.php:54
 * @route '/admin/scores'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::store
 * @see app/Http/Controllers/Admin/ScoreController.php:54
 * @route '/admin/scores'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
export const show = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/scores/{score}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
show.url = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { score: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    score: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        score: args.score,
                }

    return show.definition.url
            .replace('{score}', parsedArgs.score.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
show.get = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
show.head = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
    const showForm = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
        showForm.get = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ScoreController::show
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
        showForm.head = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
export const edit = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/scores/{score}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
edit.url = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { score: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    score: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        score: args.score,
                }

    return edit.definition.url
            .replace('{score}', parsedArgs.score.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
edit.get = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
edit.head = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
    const editForm = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
        editForm.get = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ScoreController::edit
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}/edit'
 */
        editForm.head = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
export const update = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/scores/{score}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
update.url = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { score: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    score: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        score: args.score,
                }

    return update.definition.url
            .replace('{score}', parsedArgs.score.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
update.put = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
update.patch = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
    const updateForm = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
        updateForm.put = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ScoreController::update
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
        updateForm.patch = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ScoreController::destroy
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
export const destroy = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/scores/{score}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ScoreController::destroy
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
destroy.url = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { score: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    score: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        score: args.score,
                }

    return destroy.definition.url
            .replace('{score}', parsedArgs.score.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ScoreController::destroy
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
destroy.delete = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ScoreController::destroy
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
    const destroyForm = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ScoreController::destroy
 * @see app/Http/Controllers/Admin/ScoreController.php:0
 * @route '/admin/scores/{score}'
 */
        destroyForm.delete = (args: { score: string | number } | [score: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const scores = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default scores