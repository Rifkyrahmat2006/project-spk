import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/superadmin/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CourseController::index
 * @see app/Http/Controllers/Superadmin/CourseController.php:17
 * @route '/superadmin/courses'
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
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/superadmin/courses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CourseController::create
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/create'
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
* @see \App\Http\Controllers\Superadmin\CourseController::store
 * @see app/Http/Controllers/Superadmin/CourseController.php:35
 * @route '/superadmin/courses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/superadmin/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::store
 * @see app/Http/Controllers/Superadmin/CourseController.php:35
 * @route '/superadmin/courses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::store
 * @see app/Http/Controllers/Superadmin/CourseController.php:35
 * @route '/superadmin/courses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::store
 * @see app/Http/Controllers/Superadmin/CourseController.php:35
 * @route '/superadmin/courses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::store
 * @see app/Http/Controllers/Superadmin/CourseController.php:35
 * @route '/superadmin/courses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
export const show = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/superadmin/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
show.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
show.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
show.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
    const showForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
        showForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CourseController::show
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}'
 */
        showForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
export const edit = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/superadmin/courses/{course}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
edit.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: args.course,
                }

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
edit.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
edit.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
    const editForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
        editForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CourseController::edit
 * @see app/Http/Controllers/Superadmin/CourseController.php:0
 * @route '/superadmin/courses/{course}/edit'
 */
        editForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
export const update = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/superadmin/courses/{course}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
update.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return update.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
update.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
update.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
    const updateForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
        updateForm.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Superadmin\CourseController::update
 * @see app/Http/Controllers/Superadmin/CourseController.php:72
 * @route '/superadmin/courses/{course}'
 */
        updateForm.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Superadmin\CourseController::destroy
 * @see app/Http/Controllers/Superadmin/CourseController.php:107
 * @route '/superadmin/courses/{course}'
 */
export const destroy = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/superadmin/courses/{course}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Superadmin\CourseController::destroy
 * @see app/Http/Controllers/Superadmin/CourseController.php:107
 * @route '/superadmin/courses/{course}'
 */
destroy.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return destroy.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\CourseController::destroy
 * @see app/Http/Controllers/Superadmin/CourseController.php:107
 * @route '/superadmin/courses/{course}'
 */
destroy.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Superadmin\CourseController::destroy
 * @see app/Http/Controllers/Superadmin/CourseController.php:107
 * @route '/superadmin/courses/{course}'
 */
    const destroyForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Superadmin\CourseController::destroy
 * @see app/Http/Controllers/Superadmin/CourseController.php:107
 * @route '/superadmin/courses/{course}'
 */
        destroyForm.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseController = { index, create, store, show, edit, update, destroy }

export default CourseController